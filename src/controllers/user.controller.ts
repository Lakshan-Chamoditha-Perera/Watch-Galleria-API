import { Request, Response } from "express";
import { StandardResponse } from "../util/payloads/StandardResponse";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
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


export const profileImageChange = async (req: Request, res: Response) => {
    const email = req.params.email;
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        console.log("No files uploaded");
        res.status(400).send(new StandardResponse(400, "No files uploaded", null));
        return;
    }

    // Assuming the uploaded file is an image, you can access it like this
    const profileImage: Buffer = (req.files as Express.Multer.File[])[0].buffer;

    console.log("UserController: profileImageChange {} email: " + email + " profileImage size: " + Buffer.byteLength(profileImage));
    const user = await UserService.profileImageChange(email, profileImage);

    if (!user) {
        console.log("User not found");
        res.status(404).send(new StandardResponse(404, "User not found", new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null)));
        return;
    }

    res.status(200).send(new StandardResponse(200, "User Updated", user));
};