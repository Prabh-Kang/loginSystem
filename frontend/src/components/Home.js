import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "./AuthComponents/utils/authContext";

export default function Home() {
    const history = useHistory();
    const context = useContext(AuthContext);
    if(!context.user.isConfirmed) {
        history.push("/unconfirmeduser")
    }
    return (
        <div>
            You are now a verified user !!!!
            <button onClick={() => context.logout()}>Logout</button>
        </div>
    )
}