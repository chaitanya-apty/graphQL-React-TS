import { FastifyServer, IRouterOptions } from 'types/fastify';
import authHook from '../hooks/auth.hook';
import { graphQlOptions } from '../../backend/graph-schema/graphql-options';

module.exports = function Route(instance: FastifyServer, opts: IRouterOptions, done: (error?: Error) => void): void {
    // Adding Chai Hook
    authHook(instance);
    instance.register(require('fastify-gql'), graphQlOptions);
    done();
};
