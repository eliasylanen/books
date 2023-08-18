import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { getBookByTitle, getBooks } from './db.js';

const { router, procedure: publicProcedure } = initTRPC.create();

export { publicProcedure, router };

export const appRouter = router({
	bookList: publicProcedure
		.input(
			z.optional(
				z.object({
					page: z.onumber(),
					offset: z.onumber(),
				}),
			),
		)
		.query(async ({ input = {} }) => {
			const books = await getBooks(input);
			return books;
		}),
	bookByTitle: publicProcedure.input(z.string()).query(async ({ input }) => {
		const book = await getBookByTitle(input);
		return book;
	}),
});
