import { Request, Response } from '../../types/fastify';
import { checkRequest } from '../../utils/env-helpers';

export default function(instance): void  {
    instance.addHook('preParsing', async (req: Request, reply: Response) => {
        try {
            if (checkRequest(req.headers)) {
              return; // @Chaitu will update later
            }
            const token = req.headers['authorization'];
            await instance.jwt.verify(token);
          } catch (err) {
            reply.send(err);
          }
    });
}
