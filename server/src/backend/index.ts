import * as mongoose from 'mongoose';
import * as fastifyPlugin from 'fastify-plugin';
import { mongooseOptions } from '../utils/env-helpers';
import { FastifyServer, IRouterOptions } from 'types/fastify';
import { appErrors } from '../utils/errors/appErrors';

const MongoDBEvents = (db: mongoose.Connection) => {
    db.once('connected', () => {
        return console.info('Connected to Mongo DB 😄');
    });
    db.on('disconnected', () => {
        return console.info('Disconnected to Mongo DB');
    });
    db.on('reconnected', () => {
        return console.info('Reconnected to Mongo DB 😅!');
    });
};

async function mongoConnect(instance: FastifyServer, options: IRouterOptions): Promise<void> {
    if (!mongoose.connection.readyState) {
        try {
            const uri = options['url'];
            delete options['url'];
            MongoDBEvents(mongoose.connection);
            const connection = await mongoose.connect(uri, mongooseOptions);
            instance.decorate('mongo', connection);

        } catch (E) {
            throw appErrors.DATA_BASE_ERROR;
        }
    }
}

export default fastifyPlugin(mongoConnect);
