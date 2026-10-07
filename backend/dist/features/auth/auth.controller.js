import { registerService } from "./auth.service.js";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerService(name, email, password);
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Failed to register user",
            });
        }
        return res.status(201).json({
            success: true,
            message: "User Registration successfull",
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "USERALREADYEXISTS") {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
