import mongoConnect from './';
import { FastifyServer } from 'types/fastify';

// Registering DB PLugin
export default function(server: FastifyServer, uri: string): void {
    server.register(mongoConnect, {
        url: uri
    });
}
