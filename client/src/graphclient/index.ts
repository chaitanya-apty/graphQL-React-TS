import ApolloClient from 'apollo-boost';

let isWarned = false;

const clientPort  = new ApolloClient({
    uri: 'http://localhost:5000/private/graphql',
    fetchOptions: {
        credentials: 'include'
      },
    request: async (operation) => {
        console.log(operation);
        const token = localStorage.getItem('TOKEN');
        operation.setContext({
          headers: {
            authorization: token
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
