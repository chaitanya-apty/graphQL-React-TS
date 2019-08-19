import { FastifyServer } from 'types/fastify';
import { IConfig } from 'types/common';
import { CorsOptions } from './utils/env-helpers';

export const appSettings = (server: FastifyServer, config: IConfig) => {
    server.use(require('cors')(CorsOptions(config)));
    server.options('*', (request, reply) => { reply.send(); });

    server.register(require('fastify-formbody'));

    // Error handler Listener
    server.setErrorHandler((error, request, reply) => {
        const statusCode = error.statusCode >= 400 ? error.statusCode : 500;
        reply.code(statusCode).send({
            error: error.message, status: error.statusCode
        });
    });
};
