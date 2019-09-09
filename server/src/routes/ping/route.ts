import { FastifyServer, IRouterOptions } from 'types/fastify';
module.exports = function Route(instance: FastifyServer, opts: IRouterOptions, done: (error?: Error) => void): void {
    instance.get('/', (request, reply) => {
        reply.send('Server Pinging @' + request.hostname);
    });
    done();
};
