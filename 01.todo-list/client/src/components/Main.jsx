import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner";
import React from 'react';

export default function Main() {
	const [todos, setTodos] = useState([]);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		fetch("http://localhost:3030/jsonstore/todos")
			.then((res) => res.json())
			.then((result) => {
				const data = Object.values(result);
				setTodos(data);
				setPending(false);
			});	
	}, []);

	const todoItemChangeHandler = (todoId) => {
		setTodos((oldTodos) => oldTodos.map(todo => todo._id === todoId 
			? {...todo, isCompleted: !todo.isCompleted} 
			: todo
		));
	}

	return (
			<main className="main">
					<section className="todo-list-container">
							<h1>Todo List</h1>

							<div className="add-btn-container">
									<button className="btn">+ Add new Todo</button>
							</div>

							<div className="table-wrapper">
								{pending && <Spinner />}
								{/* SPINNER */}

								<table className="table">
										<thead>
												<tr>
														<th className="table-header-task">Task</th>
														<th className="table-header-status">Status</th>
														<th className="table-header-action">Action</th>
												</tr>
										</thead>
										<tbody>
												{todos.map(todo => 
													<TodoItem 
														key={todo._id} 
														id={todo._id}
														text={todo.text}
														isCompleted={todo.isCompleted}
														onStatusChange={todoItemChangeHandler}
													/>
												)}
										</tbody>
								</table>
							</div>
					</section>
			</main>
	);
}
