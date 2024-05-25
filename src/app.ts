import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { userControllers } from "./app/models/User/user.controller";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFoundRoute";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is OK!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
