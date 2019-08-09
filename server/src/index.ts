import * as fastify from 'fastify';
import { appSettings } from './settings';
import initializeApp from './app';
import initialiseRoutes from './routes';


const server = fastify({logger: false});

appSettings(server);
initialiseRoutes(server);

// App Initialise
initializeApp(server);
