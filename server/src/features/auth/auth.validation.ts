import type { SignupRequest } from './auth.types.js';
import type { LoginRequest } from './auth.types.js';


export function validateSignup (data: SignupRequest): SignupRequest {
    const cleanUser = (data.username ? data.username : '').trim();
    const cleanPassword = (data.password ? data.password : '');
    const cleanFirstName = (data.first_name ? data.first_name : '').trim();
    const cleanLastName = (data.last_name ? data.last_name : '').trim();
    const cleanEmail = (data.email_address ? data.email_address : '').trim();
    const cleanNumber = (data.phone_number ? data.phone_number : '').trim();
    const birthday = (data.date_of_birth ? data.date_of_birth : '').trim();


    const inputs = [cleanUser, cleanPassword, cleanFirstName, cleanLastName, cleanEmail, cleanNumber, birthday];
    if(inputs.some(input => input === '')){
        throw new Error(`Input cannot be empty.`)
    };

    const hasAtSymbol: boolean = cleanEmail.includes('@');
    const digitRegex = /^\d{10}$/;
    const hastenDigits: boolean = digitRegex.test(cleanNumber);

    if(!hasAtSymbol){
        throw new Error(`Invalid Credentials`);
    }

    if(!hastenDigits){
        throw new Error(`Invalid Credentials`);
    }


    if(cleanUser.length < 8){
        throw new Error(`Invalid Credentials: User must have a minimum of 8 characters.`);
    }
    
    if(cleanPassword.length < 8){
        throw new Error(`Invalid Credentials: Password have a minimum of 8 characters.`)
    }
    

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if(!regex.test(birthday)){
        throw new Error(`Invalid date format`);
    }

    const dateObj = new Date(birthday);

    if(isNaN(dateObj.getTime())){
        throw new Error(`Invalid date`);
    }


    return {
        username: cleanUser,
        password: cleanPassword,
        first_name: cleanFirstName,
        last_name: cleanLastName,
        email_address: cleanEmail,
        phone_number: cleanNumber,
        date_of_birth: birthday
    }
    
};

export function validateLogin (data: LoginRequest): LoginRequest {
    const cleanUser = (data.username ? data.username : '').trim();
    const cleanPassword = (data.password ? data.password : '');

    const inputs = [cleanUser, cleanPassword];
    if(inputs.some(input => input === '')){
        throw new Error(`Invalid Credentials`);
    }

    return {
        username: cleanUser,
        password: cleanPassword
    }
};
