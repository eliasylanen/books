import { initTRPC } from '@trpc/server';
import { getAllBooks } from '../../server/db';

const { router, procedure: publicProcedure } = initTRPC.create();

export const appRouter = router({
	booksList: publicProcedure.query(async () => {
		const books = await getAllBooks();
		return books;
	}),
});
