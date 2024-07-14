import Search from "../search/Search";
import UserList from "./user-list/UserList";
import UserDetails from "./user-details/UserDetails";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import UserAdd from "./user-add/UserAdd";
import UserDelete from "./user-delete/UserDelete";

const baseUrl = "http://localhost:3030/jsonstore";

export default function UserSection() {
	const [users, setUsers] = useState([]);
	const [showAddUser, setShowAddUser] = useState(false);
	const [showUserDetailsById, setShowUserDetailsById] = useState(null);
	const [showUserDeleteById, setShowUserDeleteById] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`${baseUrl}/users`)
			.then(response => response.json())
			.then(result => {
				const usersResult = Object.values(result);

				setIsLoading(false);
				setUsers(usersResult);
			})
			.catch(error => alert(error))
			.finally(() => setIsLoading(false));
	}, []);

	const addUserClickHandler = () => {
		setShowAddUser(true);
	}

	const addUserCloseHandler = () => {
		setShowAddUser(false);
	}

	const addUserSaveHandler = async (e) => {
		// prevent refresh
		e.preventDefault();

		// get form data
		const formData = new FormData(e.currentTarget);
		const userData = {
			...Object.fromEntries(formData),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// make post request
		const response = await fetch(`${baseUrl}/users`, {
			method: "POST",
			headers: { 
				"Content-Type": "application/json" 
			},
			body: JSON.stringify(userData)
		});
		const createdUser = await response.json();

		console.log(createdUser);

		// update local users state
		setUsers(oldUsers => [...oldUsers, createdUser]);

		// close modal
		setShowAddUser(false);
	}
	

	const userDetailsClickHandler = (userId) => {
		setShowUserDetailsById(userId);
	}

	const userDeleteClickHandler = (userId) => {
		setShowUserDeleteById(userId);
	}

	const userDeleteHandler = async (userId) => {
		// Delete request to server 
		await fetch(`${baseUrl}/users/${userId}`, {
			method: "DELETE"
		});

		// Delete from local state
		setUsers(oldUsers => oldUsers.filter(u => u._id !== userId));

		// close modal
		setShowUserDeleteById(null);
	}

	return (
		<section className="card users-container">
			<Search />

			<UserList
				users={users} 
				isLoading={isLoading}
				onUserDetailsClick={userDetailsClickHandler}
				onUserDeleteClick={userDeleteClickHandler}
			/>

			{showAddUser && (
				<UserAdd
					onClose={addUserCloseHandler} 
					onSave={addUserSaveHandler}
				/>
			)}

			{showUserDetailsById && (
				<UserDetails
					user={users.find(u => u._id === showUserDetailsById)}
					onClose={() => setShowUserDetailsById(null)}
				/>
			)};

			{showUserDeleteById && (
				<UserDelete
					onClose={() => setShowUserDeleteById(null)}
					onUserDelete={() => userDeleteHandler(showUserDeleteById)}
				/>
			)};

			{/* <!-- New user button  --> */}
			<button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

			<Pagination />
		</section>
	);
}