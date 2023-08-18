import { FC } from 'react';
import { BookFields } from '../../../../server/src/model/Book';
import './Book.css';

export const Book: FC<BookFields> = ({ title, timestamp, author }) => {
	return (
		<div className="book">
			<h1>{title}</h1>
			<h2>{author}</h2>
			<p>{timestamp}</p>
		</div>
	);
};
