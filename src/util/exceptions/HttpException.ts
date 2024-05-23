export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: any, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCodes {
    INVALID_INPUT = 1001,
    USER_NOT_FOUND = 1002,
    INCORRECT_PASSWORD = 1003,
    USER_ALREADY_EXISTS = 1004,
    SERVER_ERROR = 1005,
    VALIDATION_ERROR = 1006
}
