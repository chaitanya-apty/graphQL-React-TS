import { MongoConnectOptions, IConfig } from 'types/common';
import fastify = require('fastify');

export const mongooseOptions: MongoConnectOptions = {
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 2000
};

export const CorsOptions = (config: IConfig) => ({
    origin: config.PROD_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
});

export const checkRequest = (headers: fastify.DefaultHeaders) => {
    return headers['x-origin-request'].indexOf('login') > -1;
};
