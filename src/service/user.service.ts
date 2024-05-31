import {hashSync} from "bcrypt";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {SignupSchema,LoginSchema,UserModel} from "../schema/users.schema";
import {uploadImage} from "./firebase.service";

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