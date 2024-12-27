export class CustomErrorApi extends Error {
  statusCode: number | string;

  constructor(message: string, statusCode: number | string) {
    super(message);
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
