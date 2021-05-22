import { useContext } from 'react';
import { AuthContext } from './authContext';
import { Route, Redirect } from 'react-router-dom';
export default function PrivateRoute({ component:Component, ...rest }) {

    const context = useContext(AuthContext);
    console.log("home context ", context)
    return (
         <Route 
            {...rest}
            render={ props => context.user === null ? <Redirect to='/login' /> : context.user.isConfirmed ? <Component { ...props } /> : <Redirect to="/unconfirmeduser" />  }
        />
       
    )
}