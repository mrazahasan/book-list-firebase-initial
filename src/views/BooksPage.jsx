import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks, selectBooks } from '../store/booksSlice.js';


function BooksPage() {

	const pageTitle = "📖 Book List with Router, Redux & Firebase";
	const books = useSelector(selectBooks).books;
	const booksStatus = useSelector(selectBooks).status;
	const dispatch = useDispatch();
	useEffect(() => {
		if (booksStatus == 'idle') {
			dispatch(fetchBooks());
		}
	}, []);




	return (
		<>
			<div className="container">
				<Header pageTitle={pageTitle} />
				<div className="books-container">
					{
						booksStatus == "loading" ?
							"Loading..."
							:

							<div className="books-list">

								{books.map(book =>

									<Book key={book.id} book={book} />

								)}

							</div>
					}
				</div>
			</div>
		</>
	)
}

export default BooksPage
