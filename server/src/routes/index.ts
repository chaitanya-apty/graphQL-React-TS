import { FastifyServer } from 'types/fastify';
import fastify from 'fastify';
import { appErrors } from '../utils/errors/appErrors';

export default function(server: FastifyServer): void {

    server.register(require('./ping/route'));

    server.register(require('./graphql-routes/route'), {
        prefix: '/private'
    });

    // 404 Catcher
    server.setNotFoundHandler((request, reply) => {
        reply.send(`** Error 404 Occured ** ${request.raw.url} **`);
    });

    // App error Handler
    server.setErrorHandler((error: fastify.FastifyError, request, reply) => {
        if (process.env.NODE_ENV === 'development') {
            reply.send(error);
        } else {
            reply.send({
                code: appErrors.EXCEPTION_OCCURED.errorCode,
                message: 'Server Crashed, Please try again'
            });
        }
    });
}
