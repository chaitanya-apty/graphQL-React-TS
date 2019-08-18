import { FastifyServer } from 'types/fastify';

export const appSettings = (server: FastifyServer) => {
    server.register(require('fastify-cors'), { origin: true });
    server.register(require('fastify-formbody'));
    
    // Error handler Listener
    server.setErrorHandler((error, request, reply) => {
        const statusCode = error.statusCode >= 400 ? error.statusCode : 500
        reply.code(statusCode).send({ 
            error: error.message, status: error.statusCode 
        });
    })
};