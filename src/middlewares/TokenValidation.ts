import { Request, Response, NextFunction } from 'express';
import * as _jwt from 'jsonwebtoken';
import * as config from '../config/config.js';

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // if(token.startWith('Bearer ')){
    //     token = token.slice(7, token.length);
    // }

    if(token){
        _jwt.verify(token, config.secret, (err, decoded ) => {
            if(err){
                return res.json({
                    success: false,
                    message: 'Invalid Token'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.json({
            success: false,
            message: 'Unauthorized access'
        });
    }
}
