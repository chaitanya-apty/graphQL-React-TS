import { FastifyServer, IRouterOptions } from 'types/fastify';
import authHook from '../hooks/auth.hook';
import { graphqlFastify, graphiqlFastify } from 'fastify-graphql';
import { graphQlOptions, graphiQlRedirect } from '../../backend/graph-schema/graphql-options';

const enableGraphiQl = (instance: FastifyServer, env: string) => {
    if (env === 'development') {
        instance.register(graphiqlFastify, graphiQlRedirect);
    }
    return;
};

module.exports = function Route(instance: FastifyServer, opts: IRouterOptions, done: (error?: Error) => void): void {
    authHook(instance);
    enableGraphiQl(instance, process.env.NODE_ENV);
    instance.register(graphqlFastify, graphQlOptions);

    done();
};
