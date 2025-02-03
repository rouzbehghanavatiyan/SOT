import { CustomErrorApi } from "../CustomError";
import StatusCode from "http-status-codes";

export default class UnAthenticated extends CustomErrorApi {
  constructor(message: string, statusCode: number | string) {
    super(message, statusCode);
    this.statusCode = StatusCode.UNAUTHORIZED;
  }
}
