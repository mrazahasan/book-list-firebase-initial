import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks, selectBooks } from '../store/booksSlice.js';
import { Link } from 'react-router-dom';


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
						books.length ?

							<div className="books-list">

								{books.map(book =>

									<Book key={book.id} book={book} />

								)}

							</div> :
							booksStatus == "loading" ?
								<div>
									<p>Loading...</p>
								</div> :
								<div>
									<p>Your book list is empty, <Link to="/add-book">click here</Link> to add new book.</p>
								</div>
					}
				</div>
			</div>
		</>
	)
}

export default BooksPage
