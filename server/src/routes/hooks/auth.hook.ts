import { FastifyServer, Request, Response } from "../../types/fastify";

export default function(instance: FastifyServer) {
    instance.addHook('onRequest', (req: Request, reply: Response, done: (err?: Error) => void) => {
        // IsTOkenValid
        if(true) {
            done();
        }
    })
}