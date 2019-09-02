import { FastifyServer, IRouterOptions } from 'types/fastify';
import authHook from '../hooks/auth.hook';

module.exports = function Route(instance: FastifyServer, opts: IRouterOptions, done: (error?: Error) => void): void {
    authHook(instance);
    instance.get('/', async (request, reply) => {
        reply.send('Hello Server Started');
    });
    done();
};
