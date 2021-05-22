import { GET_USER, LOGOUT } from './constants';
import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useReducer } from 'react';
import reducer from './reducer';

const AuthContext = React.createContext();

const initialState = {
    user:null,
}

const AuthProvider = props => {
    
    const { loading, data, refetch } = useQuery(GET_USER);

    const [ mutatefn ] = useMutation(LOGOUT, {
        update(_,__) {
            dispatch({ type:"LOGOUT" })
        }
    });

    if(!loading) {
        if(data.me) {
            initialState.user = data.me
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log('state is ', state);

    const register = userData => {
        dispatch({ type:"REGISTER", payload:userData });
    }

    const login = userData => {
        dispatch({type:"LOGIN", payload:userData});
    }

    const logout = () => {    
         mutatefn();
    }

    const confirmUser = () => {
        dispatch({ type:"CONFIRM_EMAIL" })
    }

    const user = state.user;

    return (
        <>
       { !loading &&  <AuthContext.Provider value={{user, loading, login, logout, register, refetch, confirmUser}} { ...props }  /> }
       </>
    ) 
}

export {
    AuthProvider,
    AuthContext
}