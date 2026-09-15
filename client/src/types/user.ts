export interface SignupRequest {
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email_address: string,
    phone_number: string,
    date_of_birth: string
};

export interface SignupResponse {
    user_id: number,
    username: string,
    first_name: string,
    last_name: string,
    email_address: string,
    phone_number: string,
    date_of_birth: string,
    created_at: string
}

export interface LoginRequest {
    username: string,
    password: string
};

export interface LoginResponse {
    user_id: number,
    token: string
};

export interface User {
    user_id: number,
    username: string,
    first_name: string,
    last_name: string,
    email_address: string,
    phone_number: string,
    date_of_birth: string
}
