import jwt, {type SignOptions} from 'jsonwebtoken';
import { env } from '../config/env.js';

const expiration: SignOptions = {
    expiresIn: '1h'
}
const secretKey = env.jwtSecret;


// Best Practice instead of any... 
//Why? your editor automatically knows exactly what is inside the token. if you start typing decoded. it will pop up with a suggestion for userId.
export interface MyJwtPayload extends jwt.JwtPayload {
    userId: number;
}

export function generateToken(id: number): string{
    const token = jwt.sign( {userId: id}, secretKey, expiration);

    return token;
};


export function isMyJwtPayload(input: unknown): input is MyJwtPayload{
    return (
        typeof input === 'object' && 
        input !== null && 
        'userId' in input && 
        typeof input.userId === 'number' && 
        Number.isFinite(input.userId)
    )
}

export function verifyToken(token: string ){
    const decoded = jwt.verify(token, secretKey);

    if(!isMyJwtPayload(decoded)){
        throw new Error('Invalid Credentials')
    }

    return decoded;
}

// The simpler way...
// export function verifyToken(token: string) { const decoded = jwt.verify(token, secretKey) console.log('Token is valid, payload', decoded) return decoded as any;}
// You can use this method and you would essentially tell typescript that accept anything... because typescript originally doesnt
// accept anything because a plain text string doesn't have a .userId property... it panics and underlines your code in red to prevent your app from crashing.
// you can use this but autocomplete .userid for you when type it... if i were to type req.userId = decoded.userIddd typescript wont warn you.


