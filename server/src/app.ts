import { FastifyServer } from 'types/fastify';

export default async (server: FastifyServer): Promise<void> => {
    try {
        await server.listen(5000, (err: Error, address: string) => {
            if (err) throw err;
            return;
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    } finally {
        process.on('uncaughtException', (error) => {
            console.error(error);
            process.exit(1);
        });
    }
};