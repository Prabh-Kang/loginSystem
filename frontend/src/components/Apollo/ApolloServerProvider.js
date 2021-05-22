import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import App from '../../App';

const httpLink = createHttpLink({
    uri:'http://localhost:4001/graphql',
    credentials:'include',
})

const client = new ApolloClient({
    link:httpLink,
    cache:new InMemoryCache(),
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)