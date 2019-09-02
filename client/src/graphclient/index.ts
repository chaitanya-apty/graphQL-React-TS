import ApolloClient from 'apollo-boost';

let isWarned = false;
const clientPort  = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    onError: (error) => {
        if(error.networkError && !isWarned) {
            isWarned = true;
            console.error(error)
            alert('Server Not Running, Please Check')
        }
    },
});

export default clientPort;
