import gql from 'graphql-tag';

const GET_USER = gql `
 {
        me {
            id
            username
            email
            isConfirmed
        }
    }

`

const REGISTER = gql `
    mutation register($email:String!, $username:String!, $password:String!, $confirmPassword:String!) {
        register(registerInput:{username:$username, email:$email, password:$password, confirmPassword:$confirmPassword}) {
            id username email isConfirmed
        }
    }
`;

const LOGIN = gql `
    mutation login($email:String!, $password:String!) {
        login(loginInput:{email:$email, password:$password}) {
            id username email isConfirmed
        }
    }

`;

const LOGOUT = gql `
    mutation logout{
        logout 
    }
`;

const SEND_EMAIL = gql `
    mutation sendEmail($email:String!, $id:ID!) {
        sendEmail(email:$email, id:$id) 
    }
`;

const VERIFY_EMAIL_TOKEN = gql `
    mutation confirmUser($token:String!) {
        confirmUser(token:$token)
    }
`


export {
    GET_USER,
    REGISTER,
    LOGIN,
    LOGOUT,
    SEND_EMAIL,
    VERIFY_EMAIL_TOKEN   
}