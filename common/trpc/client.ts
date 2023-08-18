import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../server';
import { backendUrl } from '../config';

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: backendUrl,
		}),
	],
});

export const getAllBooks = async () => {
	const books = await trpc.booksList.query();
	console.log(books);
};
