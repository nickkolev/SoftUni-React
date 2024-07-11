import Search from "../search/Search";
import UserList from "./user-list/UserList";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3030/jsonstore";

export default function UserSection() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		function getUsers() {
			fetch(`${baseUrl}/users`)
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<section className="card users-container">
			<Search />

			<UserList />

			{/* <!-- New user button  --> */}
			<button className="btn-add btn">Add new user</button>

			<Pagination />
		</section>
	);
}