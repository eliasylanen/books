import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { backendPort } from '../common/config.js';
import { appRouter } from '../common/trpc/server.js';

const server = createHTTPServer({
	router: appRouter,
});

server.listen(backendPort);
console.info('Server listening on port', backendPort);

export type AppRouter = typeof appRouter;
