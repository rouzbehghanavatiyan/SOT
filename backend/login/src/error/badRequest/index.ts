import { CustomErrorApi } from "../customError";
import StatusCode from "http-status-codes";

export default class BadRequest extends CustomErrorApi {
  statusCode: number;
  
  constructor(message: string) {
    super(message, StatusCode.BAD_REQUEST);
    this.statusCode = StatusCode.BAD_REQUEST;
  }
}
