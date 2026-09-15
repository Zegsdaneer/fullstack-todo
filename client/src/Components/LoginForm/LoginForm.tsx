import './LoginForm.css';
import { useState } from 'react';
import type { SubmitEvent, ChangeEvent } from 'react';
import Button from '../Buttons/Button';
import type { LoginRequest } from '../../types/user';

interface LoginProp {
    onLogin: (payload: LoginRequest) => Promise<void>;
    switchForm: () => void;
    token?: string;
}


function LoginForm({onLogin, switchForm} : LoginProp) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassWord ] = useState('');
    const [ showPassword, setShowpassword ] = useState<boolean>(false);

    function usernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function passwordChange(event: ChangeEvent<HTMLInputElement>){
        setPassWord(event.target.value);
    }


    async function submitForm(event: SubmitEvent<HTMLFormElement> ){
        event.preventDefault();
        const payload: LoginRequest = {
            username,
            password
        }


        await onLogin(payload);
        setUsername('');
        setPassWord('');

    }

    function togglePassword(): void{
        setShowpassword((prev) => !prev);
    }


    return (
        <div className="form_box" id="login_form">
            <form onSubmit={submitForm}>
                <h2>Login</h2>
                <input type="text" 
                name="username" 
                placeholder='Username'
                className='user_login' 
                value={username}
                onChange={usernameChange}
                required/>
                <input type={showPassword ? 'password' : 'text'}
                name='password' 
                placeholder='password' 
                className='user_password' 
                value={password}
                onChange={passwordChange}
                required/>
                <i className={showPassword ? "ri-eye-line reveal_icon" : "ri-eye-off-line reveal_icon"}
                onClick={togglePassword}></i>
                <Button type='submit' size='md'>Login</Button>
                <p>Don't have an account? <a className="register-link" onClick={switchForm}>Register</a></p>
            </form>
        </div>
    )
}

export default LoginForm;