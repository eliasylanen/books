import { initTRPC } from '@trpc/server';
import format from 'date-fns/format/index.js';
import { z } from 'zod';
import { createBook, getBookByTitle, getBooks } from './db.js';
import { getError } from './lib/getError.js';
import { getBookFields } from './model/Book.js';

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
			try {
				return await getBooks(input);
			} catch (error) {
				throw new Error(getError(error));
			}
		}),
	bookByTitle: publicProcedure.input(z.string()).query(async ({ input }) => {
		try {
			return await getBookByTitle(input);
		} catch (error) {
			throw new Error(getError(error));
		}
	}),
	createBook: publicProcedure
		.input(z.object({ title: z.string(), author: z.string() }))
		.mutation(async ({ input }) => {
			try {
				const timestamp = format(new Date(), 'yyyy-MM-dd:HH:mm:ss');
				await createBook({ ...input, timestamp });
				return getBookFields({ ...input, timestamp });
			} catch (error) {
				throw new Error(getError(error));
			}
		}),
});
