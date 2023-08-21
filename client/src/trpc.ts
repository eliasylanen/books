import { createTRPCReact, inferReactQueryProcedureOptions } from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '../../server/src/index.js';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

type bookListInput = RouterInputs['bookList'];
type bookListOptions = ReactQueryOptions['bookList'];

export function useBookList(input: bookListInput, options?: bookListOptions) {
	return trpc.bookList.useQuery(input, options);
}

export function useCreateBook() {
	return trpc.createBook.useMutation();
}

/**
 * Not used in this excercise, but here for reference
 */
type bookByTitleInput = RouterInputs['bookByTitle'];
type bookByTitleOptions = ReactQueryOptions['bookByTitle'];

export function useBookByTitle(input: bookByTitleInput, options?: bookByTitleOptions) {
	return trpc.bookByTitle.useQuery(input, options);
}
