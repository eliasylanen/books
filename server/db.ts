import path from 'node:path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { dbPath, defaultTable } from '../common/config.js';

export interface Book {
	title: string;
	author?: string;
	timestamp: Date;
}

export const db = await open({
	filename: path.resolve(dbPath),
	driver: sqlite3.cached.Database,
});

export const getSingleBook = async (title: string) => {
	return await db.get<Book>(`SELECT * FROM ${defaultTable} WHERE title = ${title}`);
};

export const getAllBooks = async () => {
	return await db.all<Book[]>(`SELECT * FROM ${defaultTable}`);
};
