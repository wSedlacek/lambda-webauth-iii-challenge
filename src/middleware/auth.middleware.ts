import { Middleware } from "../models/middleware.model";
import { findBy } from "../database/users";
import { AuthService } from "../services/auth.service";
import { User } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const requiresAuth: Middleware = () => async (req, res, next) => {
  try {
    const { id } = AuthService.verify<{ id: string }>(
      req.headers.authorization
    );
    if (!id) return res.status(400).json({ message: "Invalid Credentials" });

    const user = await findBy({ id });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });
    req.user = user;

    return next();
  } catch (err) {
    res.status(500).send();
  }
};
