import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';
import { SEND_EMAIL, VERIFY_EMAIL_TOKEN } from './utils/constants';

export default function ConfirmUser({ match }) {
    const [ message, setMessage ] = useState('');
    const [error, setError] = useState({});
    const token = match.params.id;
    const [ sendEmail ] = useMutation(SEND_EMAIL, {
        update() {
            setMessage("Email sent successfully.");
        }
    })

    const [ verifyEmailToken ] = useMutation(VERIFY_EMAIL_TOKEN, {
        update() {
            setMessage("Email verified successfully")
        }, 
        onError(err){
            setError(err.graphQLErrors[0].extensions.exception.errors);
        }
     })
    
    useEffect(() => {
        verifyEmailToken({ variables: { token } });
    }, [verifyEmailToken, token])

    const handleClick = () => {
        const user = jwtDecode(token);
        console.log("Decoded user is ", user)
        sendEmail({ variables:{ email:user.email, id:user.id } })
    }
    

    return (
        <div>
            Confirming user details.
            Please wait...
            { error  && (
            <>
            { error.invalidToken }
            <button onClick={handleClick}> Send link again</button>
            <small>{ message }</small>
            </>
            )}
        </div>
    )
}