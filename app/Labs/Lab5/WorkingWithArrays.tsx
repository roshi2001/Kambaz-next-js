"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const idSafe = encodeURIComponent(String(todo.id).trim());
  const titleSafe = encodeURIComponent(todo.title.trim());
  const descSafe = encodeURIComponent(todo.description.trim());
  const completedSafe = String(todo.completed).toLowerCase(); // "true"/"false"

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${idSafe}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        className="w-50"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h3>Creating new Items in an Array</h3>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h3>Removing from an Array</h3>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${idSafe}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        className="w-50"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Updating an Item in an Array</h3>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          placeholder="ID"
          className="w-25"
          value={todo.id}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl
          placeholder="New Title"
          className="w-50"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a
          className="btn btn-primary"
          href={`${API}/${idSafe}/title/${titleSafe}`}
        >
          Update Todo Title
        </a>
      </div>
      <hr />

      <h3>Describe a Todo</h3>
      <div className="d-flex gap-2 mb-2">
        <FormControl
          as="textarea"
          rows={1}
          className="w-75"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          placeholder="New description..."
        />
        <a
          className="btn btn-secondary"
          href={`${API}/${idSafe}/description/${descSafe}`}
        >
          Describe Todo ID = {todo.id}
        </a>
      </div>
      <hr />

      <h3>Complete a Todo</h3>
      <div className="d-flex align-items-center gap-3 mb-2">
        <div className="d-flex align-items-center gap-2">
          <label className="mb-0">Completed?</label>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) =>
              setTodo({ ...todo, completed: e.target.checked })
            }
          />
        </div>
        <a
          className="btn btn-warning"
          href={`${API}/${idSafe}/completed/${completedSafe}`}
        >
          Complete Todo ID = {todo.id}
        </a>
      </div>
      <hr />
    </div>
  );
}
