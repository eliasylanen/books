import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from '../common/trpc/server.js';

const server = createHTTPServer({
	router: appRouter,
});

server.listen(3000);
console.log('Server listening on port', 3000);

export type AppRouter = typeof appRouter;
