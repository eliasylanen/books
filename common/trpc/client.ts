import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../server';

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://127.0.0.1:3000',
		}),
	],
});

export const getAllBooks = async () => {
	const books = await trpc.booksList.query();
	console.log(books);
};
