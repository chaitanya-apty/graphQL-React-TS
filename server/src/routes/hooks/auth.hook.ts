import { Request, Response, FastifyServer } from '../../types/fastify';

export default function(instance): void  {
    instance.addHook('onRequest', async (req, reply: Response) => {
        try {
            await req.jwtVerify();
          } catch (err) {
            req['user'] = null;
          }
    });
}
