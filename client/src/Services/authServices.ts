import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse} from '../types/user'

const url = import.meta.env.VITE_API_URL;


export async function signUp(payload: SignupRequest): Promise<SignupResponse> {
    const response = await fetch(`${url}api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok){
        throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data: SignupResponse = await response.json();
    return data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${url}api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok){
        throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data: LoginResponse = await response.json();
    return data;
}
