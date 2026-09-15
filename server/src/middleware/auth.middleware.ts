import  type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';


export async function checkAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        const authHeader = req.header('authorization');
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(401).send('Unathorized');
            return;
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            res.status(401).send('Unathorized');
            return;
        }
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    }catch(error){
        console.error(error);
        res.status(401).send('Bad Token, Unathorized!');
    }
};

