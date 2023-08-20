import 'dotenv/config';

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { backendPort } from './config.js';
import { appRouter } from './trpc.js';

const server = createHTTPServer({
	middleware: cors(),
	router: appRouter,
});

server.listen(backendPort);
console.info('Server listening on port', backendPort);

export type AppRouter = typeof appRouter;
