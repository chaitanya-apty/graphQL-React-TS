import { FastifyServer } from 'types/fastify';
import { IConfig } from 'types/common';
import { CorsOptions } from './utils/env-helpers';

export const appSettings = (server: FastifyServer, config: IConfig) => {
    server.use(require('cors')(CorsOptions(config)));
    server.register(require('fastify-formbody'));
    server.register(require('fastify-jwt'), {
        secret: 'supersecret'
    });
};
