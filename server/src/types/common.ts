import { ConnectionOptions } from 'mongoose';

export interface IConfig {
    MONGO_URI: string;
    PROD_URL: string;
}

export type MongoConnectOptions = ConnectionOptions;
