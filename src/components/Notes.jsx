
import { useSelector, useDispatch } from 'react-redux';
import { selectNotes, eraseNote, addNote } from '../store/notesSlice.js';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firsbase/config.js';

function Notes({ bookId }) {

	const dispatch = useDispatch();

	const handleEraseNote = async (id) => {
		if (confirm('Are you sure you want to erase this note?')) {
			try {
				await deleteDoc(doc(db, "notes", id));
				setNotes(notes.filter(note => note.id != id));
				setFetchStatus("success");
			}
			catch (err) {
				console.log("error", err);
				setFetchStatus("error");
			}

		}
	}

	const handleAddNote = async (e) => {
		e.preventDefault();

		const newNote = {
			book_id: bookId,
			title: document.querySelector('input[name=title]').value,
			text: document.querySelector('textarea[name=note]').value
		}
		if (newNote.title && newNote.text) {
			try {
				const note = await addDoc(collection(db, "notes"), newNote);
				newNote.id = note.id;
				setNotes([...notes, newNote]);
				setFetchStatus("success");
			}
			catch (err) {
				console.log("error", err);
				setFetchStatus("error");
			}
			document.querySelector('input[name=title]').value = "";
			document.querySelector('textarea[name=note]').value = "";
		} else {
			alert('Please fill the mandatory fields.');
		}

	}

	// const notes = useSelector(selectNotes).filter(note => note.book_id == bookId);
	const [notes, setNotes] = useState("");
	const [fetchStatus, setFetchStatus] = useState("idle");

	useEffect(() => {
		if (fetchStatus == 'idle') {
			fetchNotes(bookId);
		}
	}, []);

	const fetchNotes = async (book_id) => {
		try {
			const q = query(collection(db, "notes"), where("book_id", "==", book_id));

			const querySnapshot = await getDocs(q);
			let notesList = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				notesList.push({ id: doc.id, ...doc.data() });
			});
			setNotes(notesList);

			setFetchStatus("success");
		}
		catch (err) {
			console.log("error", err);
			setFetchStatus("error");
		}
	}

	return (
		<>

			<div className="notes-wrapper">

				<h2>Reader's Notes</h2>

				{notes.length ?

					<div className="notes">
						{notes.map(note =>
							<div key={note.id} className="note">
								<div onClick={() => handleEraseNote(note.id)} className="erase-note">Erase note</div>
								<h3>{note.title}</h3>
								<p>{note.text}</p>
							</div>
						)}
					</div>

					:
					fetchStatus === "success" ?

						<div>
							<p>This books doesn't have notes yet. Use the form below to add a note.</p>
						</div>

						: fetchStatus === "error" ?

							<div>
								<p>Error fetching notes</p>
							</div>

							:

							<div>
								<p>Loading...</p>
							</div>

				}


				<details>
					<summary>Add a note</summary>
					<form className="add-note">
						<div className="form-control">
							<label>Title *</label>
							<input type="text" name="title" placeholder="Add a note title" />
						</div>
						<div className="form-control">
							<label>Note *</label>
							<textarea type="text" name="note" placeholder="Add note" />
						</div>

						<button onClick={(e) => { handleAddNote(e) }} className="btn btn-block">Add Note</button>
					</form>
				</details>

			</div>

		</>
	)
}

export default Notes
