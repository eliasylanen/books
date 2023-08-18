import { FC, useEffect, useRef, useState } from 'react';
import { BookFields } from '../../../../server/src/model/Book';
import { getError } from '../../helpers';
import { usebookList } from '../../trpc';
import { Book } from '../Book';
import { Loading } from '../Loading/Loading';
import './BookList.css';

export const BookList: FC = () => {
	const [page, setPage] = useState(1);
	const [books, setBooks] = useState<BookFields[]>([]);

	const observer = useRef<IntersectionObserver>();
	const footerRef = useRef<HTMLElement>(null);

	const { data, error, isLoading, isSuccess, refetch } = usebookList({ page }, { enabled: false });

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

	if (!error && !isLoading && isSuccess && !!data?.length) {
		setPage((prev) => prev + 1);
		setBooks((prev) => [...prev, ...data]);
	}

	if (error) {
		alert(getError(error));
	}

	if (isSuccess && data.length === 0) observer.current?.disconnect();

	return (
		<>
			<main>
				<div className="books-list">
					{books.map((book, index) => (
						<Book key={index} {...book} />
					))}
				</div>
				{isLoading && <Loading />}
			</main>
			<footer ref={footerRef}></footer>
		</>
	);
};
