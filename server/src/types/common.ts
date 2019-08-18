import { ConnectionOptions } from "mongoose";

export interface IConfig {
    MONGO_URI: string;
}

export type MongoConnectOptions = ConnectionOptions;