import * as authService from "./auth.service.js";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response): Promise<void> {
    try {

        const { username, password, first_name, last_name, email_address, phone_number, date_of_birth } = req.body;
        const result = await authService.registerUser({
            username, password, first_name, last_name, email_address, phone_number, date_of_birth
        });

        res.status(201).json(result);

    }catch(error){
        console.error(error);
        res.status(500).send('Unexpected server failure');
    }

}


export async function login(req: Request, res: Response): Promise<void> {
    try{ 
        const { username, password } = req.body;
        const result = await authService.loginUser({
            username, password
        })

        res.status(200).json(result);
    }catch(error){
        console.error(error);
        res.status(500).send('Unexpected Server failure');
    }
}
