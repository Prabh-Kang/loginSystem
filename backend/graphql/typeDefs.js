const { gql } = require('graphql-tag');


module.exports = gql `

    type User {
        id:ID!,
        username:String!,
        email:String!,
        accessToken:String!,
        refreshToken:String!,
    }

    input RegisterInput {
        username:String!,
        email:String!,
        password:String!,
        confirmPassword:String!
    }

    input LoginInput {
        email:String!,
        password:String!,
    }

    type CheckUser {
        id:ID!,
        username:String!,
        email:String!,
        isConfirmed:Boolean!
    }


    type Query {
        me:CheckUser,
    }

    type Mutation {
        register(registerInput:RegisterInput): CheckUser!,
        login(loginInput:LoginInput): CheckUser!,
        logout: Boolean!,
        sendEmail(email:String!, id:ID!):Boolean!,
        confirmUser(token:String!):Boolean!,
    }

`;
