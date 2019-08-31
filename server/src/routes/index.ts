import { FastifyServer } from 'types/fastify';
import { graphqlFastify, graphiqlFastify } from 'fastify-graphql';
import { graphiQlRedirect, graphQlOptions } from '../backend/graph-schema/graphql-options';

export default function(server: FastifyServer): void {
    server.register(require('./ping/route'), {
        prefix: '/private'
    });

    // GraphQl Schema
    server.register(graphqlFastify, graphQlOptions);
    server.register(graphiqlFastify, graphiQlRedirect);

    // 404 Catcher
    server.setNotFoundHandler(function (request, reply) {
        reply.send(`Error 404 Occured ** ${request.raw.url} **`);
    });
}
