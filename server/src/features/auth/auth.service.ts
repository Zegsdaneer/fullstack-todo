import bcrypt from 'bcrypt';
import { validateSignup, validateLogin } from './auth.validation.js';
import { createUser, findUserByUsername } from './auth.repository.js';
import type { SignupRequest, LoginRequest, LoginResponse } from './auth.types.js';
import { generateToken } from '../../utils/jwt.js';


const saltRounds = 10;


export async function registerUser(input: SignupRequest) {
    const cleanInput = validateSignup(input); // Validate/Clean Input

    const userExist = await findUserByUsername(cleanInput.username); 
    if(userExist){
        throw new Error(`Username already exists`);
    }

    const hashedPassword = await bcrypt.hash(cleanInput.password, saltRounds); //hash password
    const userDataWithHash = {
        ...cleanInput,
        password: hashedPassword
    }
    const newUser = await createUser(userDataWithHash);

    return newUser;
}


export async function loginUser(input: LoginRequest): Promise<LoginResponse> {
    const cleanInput = validateLogin(input);

    const userExist = await findUserByUsername(cleanInput.username);
    if(!userExist){
        throw new Error(`Invalid username or password`);
    }
    const hashedPassword = userExist.password_hash;
    const inputPassword = cleanInput.password;


    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    if(!isMatch){
        throw new Error(`Invalid credentials`);
    }

    const token = generateToken(userExist.user_id);

    return {
        user_id: userExist.user_id,
        token: token
    };
}
