import './LoginSignUp.css';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUp';
import type { LoginRequest, SignupRequest } from '../../types/user';


interface LoginSignUpProps {
    onSignUp: (payload: SignupRequest) => Promise<void>;
    onLogin: (payload: LoginRequest) => Promise<void>;
}

function LoginSignUpForm({onLogin, onSignUp} :LoginSignUpProps) {

    const [ isLogin, setIsLogin ] = useState(true);

    function formSwitch(){
        setIsLogin((prevValue) => {
            return !prevValue;
        })
    }


    return(
        <div className="auth_wrapper">
            { isLogin ? <LoginForm onLogin={onLogin} switchForm={formSwitch} /> : <SignUpForm switchForm={formSwitch} onSignUp={onSignUp}/>}
        </div>
    )

}

export default LoginSignUpForm;