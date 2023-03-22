// @ts-nocheck
import { validateRequest } from "zod-express-middleware";
import { Router } from "express";
import {
  createComment,
  createCommentValidation,
  getAllComments,
  getComment,
  getCommentValidation,
  getSavedComments,
  toggleSaveComment,
  toggleSaveCommentValidation,
} from "../controllers/comment";
import { isAuthed } from "../middleware/isAuthed";

export const commentRouter = Router();

commentRouter.get("/comments", isAuthed, getAllComments);
commentRouter.get("/savedComments", isAuthed, getSavedComments);
commentRouter.get(
  "/comment/:commentId",
  isAuthed,
  validateRequest({ params: getCommentValidation }),
  getComment
);
commentRouter.post(
  "/comment",
  isAuthed,
  validateRequest({ body: createCommentValidation }),
  createComment
);
commentRouter.post(
  "/saveComment",
  isAuthed,
  validateRequest(toggleSaveCommentValidation),
  toggleSaveComment
);
