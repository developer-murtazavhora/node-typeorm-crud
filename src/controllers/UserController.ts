import {Request, Response} from "express";
import {getRepository} from "typeorm";

import {User} from "../entity/User";

class UserController {
    static index = async (request: Request, response: Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find({select: ['id', 'name', 'phone', 'email', 'role']});

        response.send({
            success: true,
            code: 200,
            message: 'Users have been retrieved.',
            data: {
                users: users
            }
        });
    };

    static store = async (request: Request, response: Response) => {
        let {name, phone, email, password, role} = request.body;

        let user = new User();
        user.name = name;
        user.phone = phone;
        user.email = email;
        user.password = password;
        user.role = role;
        user.hashPassword();

        const userRepository = getRepository(User);

        try {
            await userRepository.save(user);
            response.status(200).send({
                success: true,
                code: 200,
                message: 'User has been created.'
            });
        } catch (e) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'Something went wrong. Please contact support team.',
            });
        }
    };

    static show = async (request: Request, response: Response) => {
        const id: number = request.params.id;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail(id, {select: ['id', 'name', 'phone', 'email', 'role']});
            response.send({
                success: true,
                code: 200,
                message: 'User has been retrieved.',
                data: {
                    user: user
                }
            });
        } catch (error) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'No record found or something went wrong. Please contact support team.',
            });
        }
    };

    static update = async (request: Request, response: Response) => {
        const id = request.params.id;
        let {name, phone, email, password, role} = request.body;
        const userRepository = getRepository(User);

        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'No record found or something went wrong. Please contact support team.',
            });
            return;
        }

        user.name = name;
        user.phone = phone;
        user.email = email;
        user.password = password;
        user.role = role;

        try {
            await userRepository.save(user);
            response.status(200).send({
                success: true,
                code: 200,
                message: 'User has been updated.'
            });
        } catch (e) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'Something went wrong. Please contact support team.',
            });
        }
    };

    static delete = async (request: Request, response: Response) => {
        const id = request.params.id;
        const userRepository = getRepository(User);

        try {
            await userRepository.findOneOrFail(id);
            await userRepository.delete(id);

            response.status(200).send({
                success: true,
                code: 200,
                message: 'User has been deleted.'
            });
        } catch (error) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'Something went wrong. Please contact support team.',
            });
        }
    };
}

export default UserController;