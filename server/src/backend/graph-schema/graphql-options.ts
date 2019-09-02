export const graphQlOptions = {
    prefix: '/graphql',
    graphql: {
        schema: require('./schema')
    }
};

export const GRAPHIQL_ROUTE = '/graphiql';
export const graphiQlRedirect = {
    prefix: GRAPHIQL_ROUTE,
    graphiql: {
        endpointURL: '/private/graphql',
    }
};
