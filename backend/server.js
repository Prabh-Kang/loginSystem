const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv/config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const cookieMiddleware = require('./middleware/cookieMiddleware');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req, res}) => ({req, res}),
  
})

const app = express();

app.use(cookieParser());

app.use(cookieMiddleware);

server.applyMiddleware({ app, cors:{ origin:'http://localhost:3000', credentials:true } })

mongoose.connect(process.env.URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('Database is connected...')
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch(err => console.log(err));
