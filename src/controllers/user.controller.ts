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
        res.send(404).send("User not found");
        return;
    }
    res.send(new StandardResponse(200, "User exists", user));
}


export const profileImageChange = async (req: Request, res: Response) => {
    const email = req.params.email;
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        console.log("No files uploaded");
        res.status(400).send("No files uploaded");
        return;
    }

    // Assuming the uploaded file is an image, you can access it like this
    const profileImage: Buffer = (req.files as Express.Multer.File[])[0].buffer;

    console.log("UserController: profileImageChange {} email: " + email + " profileImage size: " + Buffer.byteLength(profileImage));
    const user = await UserService.profileImageChange(email, profileImage);

    if (!user) {
        console.log("User not found");
        res.status(404).send("User not found");
        return;
    }

    res.status(200).send(user);
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        console.log("UserController : updateProfile {} email : " + email)
        const user = await UserService.updateUser(email, req.body);
        if (!user) {
            console.log("User not found");
            res.status(404).send("User not found");
            return;
        }
        res.status(200).send(user);
    } catch (error: any) {
        console.log("Server Error : " + error.message)
        res.status(500).send(error);
    }
}
