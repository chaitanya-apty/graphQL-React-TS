import { FastifyServer } from 'types/fastify';
import fastify from 'fastify';

const serverCallback = (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    console.log('Server Started On =>' + address);
    return;
};

export default async (server: FastifyServer): Promise<void> => {
    try {
        await server.listen(5000, '127.0.0.1',  serverCallback);
    } catch (err) {
        console.log(err);
        process.exit(1);
    } finally {
        process.on('uncaughtException', (error) => {
            console.error(error);
            process.exit(1);
        });

        process.on('unhandledRejection', (error) => {
            console.error('App Error @', error);
        });
    }
};
