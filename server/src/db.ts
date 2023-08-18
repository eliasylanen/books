import path from 'node:path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { dbPath, defaultTable } from './config.js';
import { Book, getBookFields } from './model/Book.js';

const db = await open({
	filename: path.resolve(dbPath),
	driver: sqlite3.cached.Database,
});

const getSingleBook = async (where: string) => {
	return await db.get<Book>(`SELECT * FROM ${defaultTable} WHERE ${where}`);
};

export interface GetBooksArgs {
	page?: number;
	offset?: number;
}
export const getBooks = async ({ page = 1, offset = 0 }: GetBooksArgs) => {
	const OFFSET = `OFFSET ${(page - 1) * 20 + offset}`;
	const data = await db.all<Book[]>(
		`SELECT * FROM ${defaultTable} ORDER BY timestamp DESC LIMIT 20 ${OFFSET}`,
	);
	return data.map(getBookFields);
};

export const getBookByTitle = async (title: string) => {
	const data = await getSingleBook(`title = ${title}`);
	return getBookFields(data);
};
