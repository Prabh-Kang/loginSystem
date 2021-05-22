import { Link } from 'react-router-dom';
import { useRef } from 'react';
import useHandleMutation from './utils/useHandleMutation';

export default function Signup() {

    const emailRef= useRef();
    const usernameRef= useRef();
    const passwordRef= useRef();
    const confirmPasswordRef= useRef();
    
    const [ mutateFn, errors ] = useHandleMutation("register");

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = {};
        userData.email = emailRef.current.value;
        userData.username = usernameRef.current.value;
        userData.password = passwordRef.current.value;
        userData.confirmPassword = confirmPasswordRef.current.value;
        mutateFn({ variables:userData });   
    }


    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Sign Up</legend>
                <div>
                    <label>Username</label>    
                    <input type="text" ref={usernameRef} placeholder="eg. John Doe" />
                    { errors.username && (<small>{errors.username}</small>) }
                </div>
                <div>
                    <label>Email</label>    
                    <input type="text" ref={emailRef} placeholder="eg. abc@xyz.com"/>
                    { errors.email && (<small>{errors.email} </small>) }
                </div> 
                <div>
                    <label>Password</label>    
                    <input type="password" ref={passwordRef} />
                    { errors.password && ( <small> {errors.password} </small> ) }
                    { errors.matchPassword && ( <small>{errors.matchPassword}</small> ) }
                </div>
                <div>
                    <label>Confirm Password</label>    
                    <input type="password" ref={confirmPasswordRef} />
                    { errors.confirmPassword && ( <small> {errors.confirmPassword} </small> ) }
                    { errors.matchPassword && ( <small>{errors.matchPassword}</small> ) }
                </div>
                <button>Sign Up</button>
                <Link to="/login">Login</Link>
            </fieldset>
        </form>

    )
}