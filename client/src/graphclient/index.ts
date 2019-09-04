import ApolloClient from 'apollo-boost';
import { Header } from '../common/router-helpers/router';

let isWarned = false;

const clientPort  = new ApolloClient({
    uri: 'http://localhost:5000/private/graphql',
    fetchOptions: {
        credentials: 'include'
      },
    request: async (operation) => {
        const token = localStorage.getItem('TOKEN');
        operation.setContext({
          headers: {
            authorization: token,
            'x-origin-request': Header
          }
        });
    },
    onError: (error) => {
        if(error.networkError && !isWarned) {
            isWarned = true;
            console.error(error)
        }
    },
});

export default clientPort;
