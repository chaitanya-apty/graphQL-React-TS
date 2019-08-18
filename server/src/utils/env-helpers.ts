import { MongoConnectOptions } from 'types/common';

export const mongooseOptions: MongoConnectOptions = {
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 2000
};
