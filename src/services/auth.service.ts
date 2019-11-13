import * as jwt from "jsonwebtoken";

export class AuthService {
  private static secret = "Secret";

  public static sign<T extends {}>(payload: T) {
    return jwt.sign(payload, this.secret);
  }

  public static verify<T extends {}>(token: string) {
    return jwt.verify(token, this.secret) as T;
  }
}
