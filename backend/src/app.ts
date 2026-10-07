import express from "express";
import morgan from "morgan";
import routes from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./features/middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorMiddleware);
export default app;
