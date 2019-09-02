import ApolloClient from 'apollo-boost';

const clientPort  = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    onError: (error) => console.error('@ServerError@:',error),
});

export default clientPort;
