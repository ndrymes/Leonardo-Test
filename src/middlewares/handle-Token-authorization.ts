import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ErrorCodes } from 'src/domain/errors';
import { JWT_TOKEN_SECRET } from 'src/configs/app';

export const handleTokenAuthorization = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
        try {
            const token = req.headers['authorization'].replace('Bearer ', '');
            const decoded: any = await jwt.verify(token, JWT_TOKEN_SECRET);

            if (!decoded) {
                res.status(401).json({
                    error_code: ErrorCodes.UNAUTHORIZED_REQUEST,
                    message: 'Could not authorize request'
                });
            }
            return next();
        } catch (e) {
            res.status(401).json({
                error_code: ErrorCodes.UNAUTHORIZED_REQUEST,
                message: 'Could not authorize request'
            });
        }
    };
};
