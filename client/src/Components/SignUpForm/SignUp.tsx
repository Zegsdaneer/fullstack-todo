import './SignUp.css';
import Button from '../Buttons/Button';
import { useState } from 'react';
import type { ChangeEvent, SubmitEvent} from 'react';
import type { SignupRequest } from '../../types/user';


interface SignupProp {
    onSignUp: (payLoad: SignupRequest) => Promise<void>;
    switchForm: () => void
}


function SignUpForm({onSignUp, switchForm}: SignupProp){

    const [ formData, setFormData ] = useState<SignupRequest>({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email_address: '',
        phone_number: '',
        date_of_birth: ''
    })
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    
    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function submitForm(event: SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        await onSignUp(formData);


        const initialData: SignupRequest = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email_address: '',
            phone_number: '',
            date_of_birth: ''
        }

        setFormData(initialData)

    }

    function togglePassword(): void {
        setShowPassword((prevValue) => !prevValue)
    }

    return (
        <div className="form_box" id='register_form'>
            <form onSubmit={submitForm}>
                <h2>Register</h2>
                <input type="text" 
                placeholder='username'
                name='username'
                className='username'
                value = {formData.username}
                onChange={handleInput}
                required/>
                <input type="text" 
                placeholder='First Name'
                name='first_name' 
                className='firstName' 
                value={formData.first_name} 
                onChange={handleInput} 
                required/>
                <input type="text" 
                placeholder='Last Name'
                name='last_name' 
                className='lastName' 
                value={formData.last_name}
                onChange={handleInput}
                required/>
                <input type="text" 
                placeholder='Email' 
                name='email_address'
                className='emailAddress' 
                value={formData.email_address}
                onChange={handleInput}
                required />
                <input type="tel" 
                placeholder='Phone Number' 
                name='phone_number'
                className='phoneNumber' 
                value={formData.phone_number}
                onChange={handleInput}
                required/>
                <input type="date" 
                placeholder='Date of Birth' 
                name='date_of_birth'
                className='dateOfBirth' 
                value={formData.date_of_birth}
                onChange={handleInput}
                required/>
                <input type={showPassword ? 'text' : 'password'}
                placeholder='Password' 
                name='password'
                className='password' 
                value={formData.password}
                onChange={handleInput}
                required />
                <i className={showPassword ? 'ri-eye-line icon_reveal' : 'ri-eye-off-line icon_reveal' }
                onClick={togglePassword}></i>

                <Button type='submit' size='md'>Register</Button>
                <p>Already have an account? <a className='login-link' onClick={switchForm}>Login</a></p>
            </form>  
        </div>
    )
}


export default SignUpForm;