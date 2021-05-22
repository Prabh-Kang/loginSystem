import { Link} from 'react-router-dom';
import { useRef } from 'react';
import useHandleMutation from './utils/useHandleMutation';
export default function Login() {   
    
    const userRef= useRef();
    const passwordRef= useRef();
    
    const [ mutateFn, errors ] = useHandleMutation("login");

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = {};
        userData.email = userRef.current.value;
        userData.password = passwordRef.current.value;
        mutateFn({ variables:userData });   
    }


    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Login</legend>
                <div>
                    <label> Email</label>    
                    <input type="text" ref={userRef} placeholder="eg. John Doe" />
                    { errors.email && (<small>{errors.email}</small>) }
                    { errors.userCredentials && ( <small>{errors.userCredentials}</small> ) }
                </div>
                 
                <div>
                    <label>Password</label>    
                    <input type="password" ref={passwordRef} />
                    { errors.password && ( <small> {errors.password} </small> ) }
                    { errors.passwordCredentials && ( <small>{errors.passwordCredentials}</small> ) }
                </div>
                <button>Log In</button>
                <Link to="/register">Register</Link>                             
            </fieldset>
        </form>

    )
}