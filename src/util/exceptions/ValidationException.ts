import { ErrorCodes, HttpException } from "./HttpException";

export class UnprocessableEntity extends HttpException {
    constructor(errors: any, message: string = "Validation Error", errorCode: any = ErrorCodes.VALIDATION_ERROR) {
        super(message, errorCode, 422, errors);
    }
}
