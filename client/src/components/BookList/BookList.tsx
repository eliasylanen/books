import format from 'date-fns/format/index.js';
import { FC, useEffect, useRef, useState } from 'react';
import { BookFields } from '../../../../server/src/model/Book';
import { useBookList } from '../../trpc';
import { AddBook } from '../AddBook';
import { Book } from '../Book';
import { Container } from '../Container';
import { Loading } from '../Loading/Loading';
import './BookList.css';

export const BookList: FC = () => {
	const [page, setPage] = useState(1);
	const [offset, setOffset] = useState(0);
	const [totalBooks, setTotalBooks] = useState(0);
	const [books, setBooks] = useState<BookFields[]>([]);

	const observer = useRef<IntersectionObserver>();
	const footerRef = useRef<HTMLElement>(null);

	const { data, error, isFetching, refetch } = useBookList(
		{ page, offset },
		{ enabled: !totalBooks },
	);

	// Attach the observer to the footer, so that new books are fetched when the footer is visible
	useEffect(() => {
		observer.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						refetch();
					}
				});
			},
			{
				rootMargin: '0px 0px 10px 0px',
			},
		);
		observer.current.observe(footerRef.current!);

		return () => {
			observer.current?.disconnect();
		};
	}, [refetch]);

	if (!error && !isFetching && !!data?.books.length) {
		setPage((prev) => prev + 1);
		setTotalBooks(data.total);
		setBooks((prev) => [...prev, ...data.books]);
	}

	if (!!totalBooks && books.length >= totalBooks) observer.current?.disconnect();

	return (
		<>
			<main>
				<section className="books-list">
					{books.map((book, index) => (
						<Book key={index} {...book} />
					))}
				</section>
				<Container>
					{isFetching && <Loading />}
					{error && (
						<>
							<h4>Failed to fetch, please try again</h4>
							<button onClick={() => refetch()}>Try again</button>
						</>
					)}
				</Container>
				<AddBook setBooks={setBooks} setOffset={setOffset} />
			</main>
			<footer ref={footerRef}>&copy; Elias Ylänen {format(Date.now(), 'yyyy')}</footer>
		</>
	);
};
