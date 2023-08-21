import path from 'node:path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { dbPath, defaultTable } from './config.js';
import { Book, BookFields, getBookFields } from './model/Book.js';

const db = await open({
	filename: path.resolve(dbPath),
	driver: sqlite3.cached.Database,
});

/**
 * Helper function to get a single book from the DB using any WHERE clause
 * given by the caller.
 * Only internally available, not to be used by itself.
 */
const getSingleBook = async (where: string) => {
	return await db.get<Book>(`SELECT * FROM ${defaultTable} WHERE ${where}`);
};

export interface GetBooksArgs {
	page?: number;
	offset?: number;
}
export const getBooks = async ({ page = 1, offset = 0 }: GetBooksArgs) => {
	// Also get the total number of books in the DB,
	// so fetching can be stopped when the end of the list is reached.
	const total = Object.values(await db.get(`SELECT COUNT(*) FROM ${defaultTable}`))[0] as number;

	const OFFSET = `OFFSET ${(page - 1) * 20 + offset}`;
	const data = await db.all<Book[]>(
		`SELECT * FROM ${defaultTable} ORDER BY timestamp DESC LIMIT 20 ${OFFSET}`,
	);

	return { total, books: data.map(getBookFields) };
};

export const createBook = async ({ title, author, timestamp }: BookFields) => {
	await db.run(
		`INSERT INTO ${defaultTable} (title, author, timestamp) VALUES (?, ?, ?)`,
		title,
		author,
		timestamp,
	);
};

export const getBookByTitle = async (title: string) => {
	const data = await getSingleBook(`title = ${title}`);
	return getBookFields(data);
};
