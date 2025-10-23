export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  SUCCESS = 'Success',
  CREATED = 'Resource created successfully',
  ACCEPTED = 'Request accepted',
  NO_CONTENT = 'No content available',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized access',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Resource not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  CREATED_FAILED = "Creation failed",
  LOGIN_FAILED = "Login failed",

  USED_NICK_PHONE = "Nick or Phone already in use",
  NO_MEMBER_NICK = "Member Nick not found",
  WRONG_PASSWORD = "Wrong password",   
  CREATE_FAILED = "Create member failed", 
  SOMETHING_WENT_WRONG = "Something went wrong",
  NO_AUTHEN = "No authentication found",
}


class Errors extends Error {
    code(code: any) {
        throw new Error('Method not implemented.');
    }
    public status: HttpCode;
  
    constructor(status: HttpCode, message: Message) {
      super(message);
      this.status = status;
      Object.setPrototypeOf(this, new.target.prototype);
    }

    static standard = {
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: Message.SOMETHING_WENT_WRONG,
    }
  
    toJSON() {
      return {
        status: this.status,
        message: this.message,
      };
    }
  }

export default Errors;