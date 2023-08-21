export const sanitizeString = (str: string) => {
	str = str.replace(/[^a-ö0-9áéíóúñü .,_-]/gim, '');
	return str.trim();
};
