import * as fastify from 'fastify';
import { appSettings } from './settings';
import initialiseApp from './app';
import initialiseRoutes from './routes';
import initialiseDB from './backend';
import env from './config';

// SET ENV
const MODE = process.env.NODE_ENV;
const config = env(MODE);

const server = fastify({logger: false});

appSettings(server, config);
initialiseRoutes(server);

initialiseApp(server);
initialiseDB(config.MONGO_URI);
