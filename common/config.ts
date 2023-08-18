/**
 * Database
 */
export const dbPath = process.env?.DB_PATH ?? '';
export const defaultTable = 'books';

/**
 * Backend
 */
export const backendPort = parseInt(process.env?.BACKEND_PORT ?? '3000');
export const backendUrl = process.env?.BACKEND_URL ?? `127.0.0.1:${backendPort}`;
