export const graphQlOptions = {
    prefix: '/graphql',
    graphql: {
        schema: require('../schema/schema')
    }
}

export const graphiQlRedirect = {
    prefix: '/graphiql',
    graphiql: {
        endpointURL: '/graphql',
    }
}