import {prismaClient} from "../index";
import {Prisma, User} from "@prisma/client";
import {hashSync} from "bcrypt";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {SignupSchema} from "../schema/users.schema";

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await prismaClient.user.findFirst({
        where: {email}
    });
}
/**
 * Create a new user
 * @param userDto
 */
export const createUser = async (userDto: Prisma.UserCreateInput): Promise<User> => {
    SignupSchema.parse(userDto);

    const isExists = await prismaClient.user.findFirst({
        where: {
            email: userDto.email
        }
    });
    if (isExists) {
        throw new HttpException("User already exists", ErrorCodes.USER_ALREADY_EXISTS, 400, null);
    }

    userDto.password = hashSync(userDto.password, 10);
    return await prismaClient.user.create({
        data: userDto
    });
}

/**
 * Find user by id
 * @param id
 */
export const findById = async (id: string): Promise<User | null> => {
    let user = await prismaClient.user.findUnique({
        where: {id}
    });
    if (!user) {
        throw new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null);
    }
    return user;

};

/**
 * Update user by id
 * @param id
 * @param userDto
 */
export const updateUser = async (id: string, userDto: Prisma.UserUpdateInput): Promise<User> => {
    let user = await findById(id);
    if (!user) {
        throw new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null);
    }

    //encode password
    if (userDto.password) {
        // @ts-ignore
        userDto.password = hashSync(userDto.password, 10);
    }

    return await prismaClient.user.update({
        where: {id}, data: userDto
    });
}

/**
 * Delete user by id
 * @param id
 */
export const deleteUser = async (id: string): Promise<User> => {
    let user = await findById(id);
    if (!user) {
        throw new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null);
    }
    return await prismaClient.user.delete({
        where: {id}
    });
}
