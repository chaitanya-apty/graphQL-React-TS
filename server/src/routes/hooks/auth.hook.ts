import { FastifyServer, Request, Response } from '../../types/fastify';

export default function(instance): void  {
    instance.addHook('preParsing', async (req: Request, reply: Response) => {
        try {
            const token = req.headers['authorization'];
            await instance.jwt.verify(token);
          } catch (err) {
            reply.send(err);
          }
    });
}
