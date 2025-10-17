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
}

class Errors extends Error {
  public status: HttpCode;
  public message: Message;
  
  constructor(status: HttpCode, message: Message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default Errors;