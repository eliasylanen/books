import { FC, useEffect, useRef } from 'react';
import { Book } from '../../../../server/src/model/Book';
import { sanitizeString } from '../../lib/sanitizeString';
import { useCreateBook } from '../../trpc';
import './AddBook.css';

export interface AddBookProps {
	setBooks: React.Dispatch<React.SetStateAction<Required<Book>[]>>;
	setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const AddBook: FC<AddBookProps> = ({ setBooks, setOffset }) => {
	const modalRef = useRef<HTMLDialogElement>(null);

	const mutation = useCreateBook();

	useEffect(() => {
		const dialog = modalRef.current;

		dialog?.addEventListener('close', () => {
			document.body.style.overflow = 'auto';
		});

		return () => {
			dialog?.removeEventListener('close', () => {
				document.body.style.overflow = 'auto';
			});
		};
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);

		const title = sanitizeString(form.get('title') as string);
		const author = sanitizeString(form.get('author') as string);

		mutation.mutate(
			{ title, author },
			{
				onError: (error) => {
					console.error(error.message);
					alert('Unable to add book, please try again later.');
				},
				onSuccess(data) {
					setBooks((prev) => [data, ...prev]);
					setOffset((prev) => prev + 1);
					(event.target as HTMLFormElement).reset();
					modalRef.current?.close();
				},
			},
		);
	};

	return (
		<>
			<dialog ref={modalRef}>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">
						<span>Title:</span>
						<input type="text" name="title" required />
					</label>
					<label htmlFor="author">
						<span>Author:</span>
						<input type="text" name="author" required />
					</label>
					<div>
						<button
							type="button"
							onClick={() => {
								modalRef.current?.close();
							}}
						>
							Cancel
						</button>
						<button type="submit" value="default">
							Add book
						</button>
					</div>
				</form>
			</dialog>
			<button
				type="button"
				className="floating"
				onClick={() => {
					document.body.style.overflow = 'hidden';
					modalRef.current?.showModal();
				}}
			>
				+
			</button>
		</>
	);
};
