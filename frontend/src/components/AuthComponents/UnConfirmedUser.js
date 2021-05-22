import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { AuthContext } from './utils/authContext';
import { SEND_EMAIL } from './utils/constants';
export default function UnConfirmedUser() {
    const [successMsg, setSuccessMsg] = useState("");

    const [ sendEmailMutateFn ] = useMutation(SEND_EMAIL, {
        update() {
            setSuccessMsg("Email sent");
        }
    }) 
    const context = useContext(AuthContext)
    const handleClick = () => {
        sendEmailMutateFn({variables: { email:context.user.email, id:context.user.id }})
    }


    return (
        <div>
            <p>
            Please check your email inbox and click the given link in order to confirm your account.
            </p>
            <p>
                <button onClick={handleClick}>Click Here</button> to send link again.
                <button onClick={() => context.logout()}>Logout</button>
            </p>
            <small>{successMsg}</small>
        </div>
    )
}