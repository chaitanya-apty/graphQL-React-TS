import ApolloClient from 'apollo-boost';
import { memHistory } from '../common/router-helpers/router';

const clientPort  = new ApolloClient({
    uri: 'http://localhost:5000/private/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: async (operation) => {
        const token = localStorage.getItem('TOKEN');
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
    },
    onError: (error) => {
      const errors = !!error.graphQLErrors && error.graphQLErrors[0].message;
      // Expiration Handler
      if((errors as string).includes('401')) {
        memHistory.push('/login');
      }
    }
});

export default clientPort;
