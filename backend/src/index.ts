import { commentRouter } from "./routes/comment";
import { authRouter } from "./routes/auth";

import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

dotenv.config();

export const SECRET = process.env.SECRET!;
export const prisma = new PrismaClient();


// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.

const app = express();
app.use(cors());
app.use(express.json());
app.use("", authRouter);
app.use("", commentRouter);

app.listen(8080, () => {
  console.log("Server is running");
});
// Export type router type signature,
// NOT the router itself.
