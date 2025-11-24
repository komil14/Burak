import Errors, { HttpCode, Message } from "../libs/errors";
import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretToken;
  constructor() {
    this.secretToken = process.env.TOKEN_SECRET as string;
  }
  public async createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;
      jwt.sign(
        payload,
        this.secretToken,
        { expiresIn: duration },
        //algorithm: "HS256"  // default, all headers same as JWT standard
        (err, token) => {
          if (err) {
            reject(
              new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
            );
          } else {
            resolve(token as string);
          }
        }
      );
    });
  }

  public async checkAuth(token: string): Promise<Member> {
    const result: Member = (await jwt.verify(
      token,
      this.secretToken
    )) as Member;
    console.log("AuthService - checkAuth result:", result);
    return result;
    // result is not same as payload bc it has iat, exp fields
  }
}

export default AuthService;
