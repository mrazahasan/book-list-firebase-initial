import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setUser } from "../store/usersSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firsbase/config";

function Header({ pageTitle }) {
	const dispatch = useDispatch();

	function handleLogout() {
		signOut(auth).then(() => {
			dispatch(setUser(null));
		}).catch((error) => {
			// An error happened.
		});
	}
	return (
		<>

			<h1>{pageTitle}</h1>

			<div className="header-btns">

				<NavLink to="/">
					<button className="btn">
						Books
					</button>
				</NavLink>

				<NavLink to="/add-book">
					<button className="btn">
						Add Book +
					</button>
				</NavLink>

				<button onClick={() => handleLogout()} className="btn transparent">
					Logout
				</button>


			</div>

		</>
	)
}

export default Header
