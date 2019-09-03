import { FastifyServer, Request, Response } from '../../types/fastify';
import { GRAPHIQL_ROUTE } from '../../backend/graph-schema/graphql-options';

export default function(instance: FastifyServer): void  {
    instance.addHook('preValidation', async (req: Request, reply: Response, done: (err?: Error) => void) => {
        console.log('request entered')
        if (await 1) {
            done();
        }
        return;
    });
}
