import { useState } from 'react';
import type { LoginRequest, SignupRequest } from './types/user';
import { login, signUp } from './Services/authServices';
import TodoDashBoard from './Components/TodoDashBoard/TodoDashboard';
import LoginSignUpForm from './Components/LoginSignUpForm/LoginSignUp';





function App() {
    const [ token, setToken ] = useState(
        () => localStorage.getItem('token')
    );

    async function handleLogin(payload: LoginRequest) {
        try {
            const response = await login(payload);
            const newToken = response.token;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            console.log('Login Successful', response)

        }catch(error: any){
            console.error(error);
            throw new Error(error)
        }
    }

    async function handleSignUp(payload: SignupRequest) {
        try {
            const response = await signUp(payload);
            console.log('Form Submitted Successfully', response);

        } catch(error: any){
            console.error(error);
            throw new Error(error);
        }
    }

    function onLogout() {
        localStorage.removeItem('token');
        setToken(null);
    }


    return (
        <>
        {token === null ? <LoginSignUpForm onLogin={handleLogin} onSignUp={handleSignUp}/> : <TodoDashBoard token={token} onLogout={onLogout}/>}
        </>
    )
}

export default App;
