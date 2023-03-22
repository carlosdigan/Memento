import { Request } from "express";
import { TypedRequestBody, TypedRequestParams } from "zod-express-middleware";
import { Response } from "express";
import { z } from "zod";
import { prisma } from "..";
import { getTokenPayload } from "../utils";

const createCommentValidation = z.object({
  text: z.string(),
});
const getCommentValidation = z.object({
  commentId: z.number(),
});
const toggleSaveCommentValidation = z.object({
  commentId: z.number(),
  saveComment: z.boolean(),
});

const toggleSaveComment = async (
  req: TypedRequestBody<typeof toggleSaveCommentValidation>,
  res: Response
) => {
  const payload = getTokenPayload(req.headers.authorization!)!;
  if (typeof payload === "string") {
    return res.sendStatus(500);
  }
  const id: number = payload.id!;

  let toggleSave = null;
  if (req.body.saveComment) {
    toggleSave = await prisma.savedComments.create({
      data: {
        commentId: req.body.commentId,
        userId: id,
      },
    });
  } else {
    toggleSave = await prisma.savedComments.delete({
      where: {
        commentId_userId: {
          commentId: req.body.commentId,
          userId: id,
        },
      },
    });
  }

  if (!toggleSave) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
};

const getSavedComments = async (req: Request, res: Response) => {
  const payload = getTokenPayload(req.headers.authorization!)!;
  if (typeof payload === "string") {
    return res.sendStatus(500);
  }

  const id: number = payload.id!;
  const savedComments = await prisma.savedComments.findMany({
    where: {
      userId: id,
    },
    select: {
      comment: {
        select: {
          author: {
            select: {
              username: true,
            },
          },
          dislikes: true,
          id: true,
          likes: true,
          text: true,
          createdAt: true,
        },
      },
    },
  });

  if (!savedComments) {
    return res.sendStatus(404);
  }

  const flattenedSavedComments = savedComments.map((savedComment) => ({
    ...savedComment.comment,
  }));
  return res.send(flattenedSavedComments);
};

const getAllComments = async (req: Request, res: Response) => {
  let comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      author: { select: { username: true } },
      id: true,
      createdAt: true,
      likes: true,
      dislikes: true,
      text: true,
    },
  });

  const payload = getTokenPayload(req.headers.authorization!)!;
  if (typeof payload === "string") {
    return res.sendStatus(500);
  }
  const id: number = payload.id!;
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { savedComments: true },
  });

  if (!user) {
    return res.sendStatus(404);
  }

  const savedCommentIds = new Set(
    user.savedComments.map((savedComment) => savedComment.userId)
  );
  comments = comments.map((comment) => ({
    ...comment,
    saved: savedCommentIds.has(comment.id),
  }));
  res.send(comments);
};

const getComment = async (
  req: TypedRequestParams<typeof getCommentValidation>,
  res: Response
) => {
  const { commentId } = req.params;
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      author: { select: { username: true } },
      id: true,
      createdAt: true,
      likes: true,
      dislikes: true,
      text: true,
    },
  });

  res.send({ comment });
};

const createComment = async (
  req: TypedRequestBody<typeof createCommentValidation>,
  res: Response
) => {
  const { text } = req.body;
  const payload = getTokenPayload(req.headers.authorization!)!;
  if (typeof payload === "string") {
    return res.sendStatus(500);
  }
  const id: number = payload.id!;
  const comment = await prisma.comment.create({
    data: { text, likes: 0, dislikes: 0, authorId: id },
  });

  res.send({ comment });
};

export {
  createCommentValidation,
  getCommentValidation,
  toggleSaveCommentValidation,
  createComment,
  toggleSaveComment,
  getComment,
  getAllComments,
  getSavedComments,
};
