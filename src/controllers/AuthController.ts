import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository} from "typeorm";

import {User} from "../entity/User";
import config from "../config/config";

class AuthController {
    static registration = async (request: Request, response: Response) => {
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
        } catch (e) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'Something went wrong. Please contact support team.',
            });
            return;
        }

        response.status(200).send({success: true, code: 200, message: 'Register.'});
    };

    static login = async (req: Request, res: Response) => {
        let {email, password} = req.body;
        if (!(email && password)) {
            res.status(201).send({
                success: false,
                code: 201,
                message: 'Please enter required fields.'
            });
        }

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail({where: {email}});
        } catch (error) {
            res.status(201).send({
                success: false,
                code: 201,
                message: 'No record found or something went wrong. Please contact support team.',
            });
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(201).send({
                success: false,
                code: 201,
                message: 'Something went wrong. Please contact support team.',
            });
            return;
        }

        const token = jwt.sign({userId: user.id, email: user.email}, config.jwtSecret, {expiresIn: "1h"});

        res.status(200).send({
            success: true,
            code: 200,
            message: 'Login.',
            data: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                session_token: token
            }
        });
    };
}

export default AuthController;