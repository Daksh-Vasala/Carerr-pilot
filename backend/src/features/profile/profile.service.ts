import { randomUUID } from "node:crypto";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/user.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../../utils/api-error.js";
import { profiles } from "../../db/schema/profile.js";
import { UpdateProfileData } from "./profile.types.js";

const userColumns = {
  id: users.id,
  email: users.email,
  firstName: users.firstName,
  lastName: users.lastName,
};

const profileColumns = {
  id: profiles.id,
  phoneNumber: profiles.phoneNumber,
  linkedinUrl: profiles.linkedinUrl,
  githubUrl: profiles.githubUrl,
  portfolioUrl: profiles.portfolioUrl,
  location: profiles.location,
  bio: profiles.bio,
};

export const getProfileService = async (userId: string) => {
  const [user] = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const [profile] = await db
    .select(profileColumns)
    .from(profiles)
    .where(eq(profiles.userId, userId));

  return {
    ...user,
    profile: profile ?? null,
  };
};

export const updateProfileService = async (
  userId: string,
  data: UpdateProfileData,
) => {
  const [user] = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    location,
    bio,
  } = data;

  const [existingProfile] = await db
    .select(profileColumns)
    .from(profiles)
    .where(eq(profiles.userId, userId));

  const noChanges =
    (firstName === undefined || firstName === user.firstName) &&
    (lastName === undefined || lastName === user.lastName) &&
    (phoneNumber === undefined ||
      phoneNumber === existingProfile?.phoneNumber) &&
    (linkedinUrl === undefined ||
      linkedinUrl === existingProfile?.linkedinUrl) &&
    (githubUrl === undefined || githubUrl === existingProfile?.githubUrl) &&
    (location === undefined || location === existingProfile?.location) &&
    (portfolioUrl === undefined ||
      portfolioUrl === existingProfile?.portfolioUrl) &&
    (bio === undefined || bio === existingProfile?.bio);

  if (noChanges) {
    throw new ApiError(400, "No fields to update");
  }

  const profileData = {
    phoneNumber,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    location,
    bio,
  };

  await db.transaction(async (tx) => {
    if (firstName !== undefined || lastName !== undefined) {
      await tx
        .update(users)
        .set({
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))
        .returning(userColumns);
    }

    if (existingProfile) {
      await tx
        .update(profiles)
        .set({
          ...(phoneNumber !== undefined && { phoneNumber }),
          ...(linkedinUrl !== undefined && { linkedinUrl }),
          ...(githubUrl !== undefined && { githubUrl }),
          ...(portfolioUrl !== undefined && { portfolioUrl }),
          ...(location !== undefined && { location }),
          ...(bio !== undefined && { bio }),
        })
        .where(eq(profiles.userId, userId))
        .returning(profileColumns);
    } else {
      await db
        .insert(profiles)
        .values({ ...profileData, userId })
        .returning(profileColumns);
    }
  });

  return getProfileService(userId);
};
