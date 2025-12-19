import Errors, { HttpCode, Message } from "../libs/errors";
import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretToken;
  constructor() {
    this.secretToken = process.env.TOKEN_SECRET as string;
    console.log(
      "AuthService initialized with TOKEN_SECRET:",
      this.secretToken ? "SET" : "UNDEFINED"
    );
  }
  public async createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;
      console.log(
        "Creating token with secret:",
        this.secretToken ? "SET" : "UNDEFINED"
      );
      // Convert payload to plain object to avoid Mongoose document issues
      const plainPayload = JSON.parse(JSON.stringify(payload));
      jwt.sign(
        plainPayload,
        this.secretToken,
        { expiresIn: duration },
        (err, token) => {
          if (err) {
            console.log("JWT Sign Error:", err.message);
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

    return result;
  }
}

export default AuthService;
