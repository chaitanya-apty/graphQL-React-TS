export const graphQlOptions = {
  graphiql: process.env.NODE_ENV === 'development',
  schema: require('./schema')
};

export const GRAPHIQL_ROUTE = '/graphiql';
