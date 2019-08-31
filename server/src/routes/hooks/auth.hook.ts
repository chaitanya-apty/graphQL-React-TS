import { FastifyServer, Request, Response } from "../../types/fastify";

export default function(instance: FastifyServer): void  {
    instance.addHook('onRequest', (req: Request, reply: Response, done: (err?: Error) => void) => {
        // Todo Chaitanya SSO auth
        if (true) {
            done();
        }
    });
}
