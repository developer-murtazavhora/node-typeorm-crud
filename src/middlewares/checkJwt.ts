import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {
    const token = <string>request.headers["authorization"];

    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        response.locals.jwtPayload = jwtPayload;
    } catch (error) {
        response.status(201).send({
            success: false,
            code: 201,
            message: 'Something went wrong. Please try again later.',
        });
        return;
    }

    const {userId, email} = jwtPayload;
    const newToken = jwt.sign({userId, email}, config.jwtSecret, {expiresIn: '1h'});
    response.setHeader('token', newToken);
    next();
};