import {NextFunction, Request, Response} from "express";
import {getRepository} from "typeorm";

import {User} from "../entity/User";

export const checkRole = (roles: Array<string>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const id = response.locals.jwtPayload.userId;
        const userRepository = getRepository(User);

        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            response.status(201).send({
                success: false,
                code: 201,
                message: 'Something went wrong. Please try again later.',
            });
        }
        
        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            response.status(401).send();
        }
    };
};