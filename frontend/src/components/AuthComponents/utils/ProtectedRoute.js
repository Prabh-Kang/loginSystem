import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext';

export default function ProtectedRoute({ component:Component, ...rest }) {
    const context = useContext(AuthContext);
    return (
        <Route 
            { ...rest }
            render={ props => context.user === null ? <Component { ...props } /> :
            <Redirect to="/" />
        }
        />
    )
}