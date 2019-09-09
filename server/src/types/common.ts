import { ConnectionOptions } from 'mongoose';
import httpCodes from 'http-status-codes';

export interface IConfig {
    MONGO_URI: string;
    PROD_URL: string;
}

export type MongoConnectOptions = ConnectionOptions;

export interface IError {
    errorCode: number;
    message: string;
    date?: Date;
}
