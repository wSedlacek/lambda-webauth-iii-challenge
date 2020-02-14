import { Router } from "express";
import { compare, hash } from "bcryptjs";
import { add, findBy } from "../database/users";
import { AuthService } from "../services/auth.service";

export const authRouter = Router();
authRouter.post("/register", async ({ body }, res) => {
  try {
    const user = { ...body, password: await hash(body.password, 12) };
    const { id } = await add(user);
    const token = AuthService.sign({ id });
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/login", async ({ body }, res) => {
  const { username, password } = body;
  try {
    const { id, password: passwordHash } = await findBy({ username });
    if (!id) res.status(401).json({ message: "Invalid Credentials" });

    const valid = await compare(password, passwordHash);
    if (!valid) res.status(401).json({ message: "Invalid Credentials" });

    const token = AuthService.sign({ id });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
});
