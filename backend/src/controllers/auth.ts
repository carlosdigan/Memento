import { Response } from "express";
import { TypedRequestBody } from "zod-express-middleware";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "..";
import { createToken } from "../utils";

const loginValidation = z.object({
  email: z.string(),
  password: z.string(),
});

const registerValidation = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

const login = async (
  req: TypedRequestBody<typeof loginValidation>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return res.sendStatus(401);
  }

  const passwordMatch = bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.sendStatus(401);
  }

  const token = createToken({ username: user.username, id: user.id });

  res.send({
    token,
  });
};

const register = async (
  req: TypedRequestBody<typeof registerValidation>,
  res: Response
) => {
  const userExists = Boolean(
    await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: req.body.email,
          },
          {
            username: req.body.username,
          },
        ],
      },
    })
  );

  if (userExists) {
    return res.sendStatus(403);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({ data: { ...req.body } });
  const token = createToken({ id: user.id, username: user.username });
  res.send({
    token,
  });
};

export { loginValidation, registerValidation, login, register };
