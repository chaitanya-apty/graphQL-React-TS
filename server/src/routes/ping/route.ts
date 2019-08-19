import { FastifyServer } from 'types/fastify';
import authHook from '../hooks/auth.hook';

module.exports = function PingRoute(instance: FastifyServer, opts: unknown, done: (error?: Error) => void): void {
    authHook(instance);
    instance.get('/ping', (request, reply) => {
        reply.send('Server Pinging @ 5000');
    });
    done();
};
