import * as mongoose from 'mongoose';
import { mongooseOptions } from '../utils/env-helpers';

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

export default async (uri: string) => {
    if (!mongoose.connection.readyState) {
        try {
            MongoDBEvents(mongoose.connection);
            await mongoose.connect(uri, mongooseOptions);
        } catch (E) {
            throw new Error(E);
        }
    }
};