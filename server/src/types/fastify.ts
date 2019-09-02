import * as fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export type FastifyServer = fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

// tslint:disable-next-line: max-line-length
export type Request  = fastify.FastifyRequest<IncomingMessage, fastify.DefaultQuery, fastify.DefaultParams, fastify.DefaultHeaders, any>;

export type Response = fastify.FastifyReply<ServerResponse>;

export interface IRouterOptions extends fastify.RouteShorthandOptions {
    url: string;
}
