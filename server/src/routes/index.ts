import { FastifyServer } from 'types/fastify';
export default function(server: FastifyServer): void {
    server.register(require('./login/route'), {
        prefix: '/public'
    });

    server.register(require('./graphql-routes/route'), {
        prefix: '/private'
    });

    // 404 Catcher
    server.setNotFoundHandler((request, reply) => {
        reply.send(`** Error 404 Occured ** ${request.raw.url} **`);
    });
}
