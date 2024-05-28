import {Request, Response} from "express";
import {StandardResponse} from "../util/payloads/StandardResponse";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import * as UserService from "../service/user.service";

export const getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    console.log("UserController : getUserByEmail {} email : " + email)
    const user = await UserService.getUserByEmail(email);
    if (!user) {
        console.log("User not found");
        res.send(new StandardResponse(404, "User not found", new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null)))
        return;
    }
    res.send(new StandardResponse(200, "User exists", user));
}
