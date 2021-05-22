const meResolver = require('./resolvers/meResolver');
const registerMutation = require('./resolvers/registerMutation');
const loginMutation = require('./resolvers/loginMutation');
const logoutMutation =require('./resolvers/logoutMutation');
const sendEmailMutation = require('./resolvers/sendEmailMutation');
const confirmUserMutation = require('./resolvers/confirmUserMutation')
module.exports = {
    Query: {
     ...meResolver 
    },

    Mutation: {
        ...registerMutation,
        ...loginMutation,
        ...logoutMutation,
        ...sendEmailMutation,
        ...confirmUserMutation
    }
}