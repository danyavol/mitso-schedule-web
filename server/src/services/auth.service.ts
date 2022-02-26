import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export type Token = string;

const { PRIVATE_KEY } = process.env;
const expTime = () => 1000 * 60 * 60 * 24;
const tokenField = 'token';
const adminLabel = 'admin';


function createJWT(payload: jwt.JwtPayload, jwtOptions: jwt.SignOptions = { expiresIn: expTime() / 1000 }): Token {
    return jwt.sign(payload, PRIVATE_KEY, jwtOptions);
}

function decodeJWT(token: Token): jwt.JwtPayload {
    let payload = null;
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (!err) payload = decoded;
    });
    return payload;
}



export function adminOnly(req: Request, res: Response, next: NextFunction): void {
    const tokenPayload = decodeJWT(req.cookies[tokenField]);
    
    if (tokenPayload?.sub === adminLabel) {
        // Valid admin token
        createAdminToken(res);
        next();
    } else {
        // Invalid token
        res.sendStatus(401);
    } 
}

export function createAdminToken(res: Response): void {
    const expirationTime = expTime();
    const token = createJWT({ sub: adminLabel }, { expiresIn: expirationTime / 1000 });

    res.cookie(tokenField, token, {
        expires: new Date(Date.now() + expirationTime),
        httpOnly: true
    });
}