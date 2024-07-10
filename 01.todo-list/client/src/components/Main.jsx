import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

export default function Main() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/jsonstore/todos")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });	
  }, []);

    return (
        <main className="main">
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn">+ Add new Todo</button>
                </div>

                <div className="table-wrapper">
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
                            <TodoItem />
                            <TodoItem />
                            <TodoItem />
                            <TodoItem />

                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
