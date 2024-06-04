import {hashSync} from "bcrypt";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {SignupSchema,LoginSchema,UserModel} from "../schema/users.schema";
import {uploadImage} from "./firebase.service";
import { Error } from "mongoose";

export const getUserByEmail = async (email: string)=> {
    console.log("UserService : getUserByEmail {} email : " + email)
    return await UserModel.findOne({
        email: email
    });

}
/**
 * Create a new user
 * @param userDto
 */
export const createUser = async (userDto: any) => {
    console.log("UserService : createUser {} " )
    SignupSchema.parse(userDto);

    const isExists = await UserModel.exists({email: userDto.email});
    if (isExists) {
        throw new HttpException("User already exists", ErrorCodes.USER_ALREADY_EXISTS, 400, null);
    }

    userDto.password = hashSync(userDto.password, 10);
    return await UserModel.create(userDto);
}

/**
 * Find user by id
 * @param id
 */
export const findById = async (email: string)=> {
    let user = await UserModel.findOne({email: email})
    if (!user) {
        throw new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null);
    }
    return user;
};

// Define the profileImageChange service method
export const profileImageChange = async (email: string, profileImage:any) => {
    try {
        // Find the user by email
        const user :any = await UserModel.findOne({ email });

        // If user not found, throw an exception
        if (!user) {
            throw new HttpException('User not found', ErrorCodes.USER_NOT_FOUND, 404, null);
        }
        user.photoURL = await uploadImage(profileImage);
        await user.save();
        return user;
    } catch (error: any) {
        // If an error occurs, throw an exception
        throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
    }
};


export const updateUser = async (email: string, userDto: any) => {
    console.log("UserService : updateUser {} email : " + email)
    console.log("UserService : updateUser {} userDto : " + JSON.stringify(userDto))
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }
        
        if (userDto.name) user.name = userDto.name;
        if (userDto.email) user.email = userDto.email;
        if (userDto.photoURL) user.photoURL = userDto.photoURL;
        if (userDto.role) user.role = userDto.role;

        // Handle the address update safely
        if (userDto.address) {
            user.address = user.address || {}; // Ensure user.address is defined
            if (userDto.address.postalCode) user.address.postalCode = userDto.address.postalCode;
            if (userDto.address.city) user.address.city = userDto.address.city;
            if (userDto.address.residentialAddress) user.address.residentialAddress = userDto.address.residentialAddress;
        }

        if (userDto.mobileNumber) user.mobileNumber = userDto.mobileNumber;

        await user.save();
        return user;
    } catch (error: any) {
        console.log("Error updating user: " + error.message);
        throw error;
     }
};