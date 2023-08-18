import format from 'date-fns/format/index.js';
import isValid from 'date-fns/isValid/index.js';

export interface Book {
	title: string;
	author?: string;
	timestamp?: string;
}

export type BookFields = Required<Book>;

const isDate = (date?: unknown): date is Date => {
	if (!date) return false;

	return isValid(new Date(date as string));
};

export const getBookFields = (book?: Book): BookFields => {
	return {
		title: (book?.title ?? '').split('/').join(' / '),
		author: book?.author ?? 'Unknown author',
		timestamp: isDate(book?.timestamp)
			? format(new Date(book!.timestamp), 'yyyy-MM-dd')
			: 'No publication date',
	};
};
