"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const fetchAssignment = async () => {
    const a = await client.fetchAssignment();
    setAssignment(a);
  };
  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  const fetchTodos = async () => {
    const t = await client.fetchTodos();
    setTodos(t);
  };
  const removeTodo = async (todo: any) => {
    const updated = await client.removeTodo(todo);
    setTodos(updated);
  };
  const deleteTodo = async (todo: any) => {
    try {
    await client.deleteTodo(todo);
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
     } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }

  };
  const createNewTodo = async () => {
    const updated = await client.createNewTodo();
    setTodos(updated);
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos((prev) => [...prev, newTodo]);
  };
  const editTodo = (todo: any) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t))
    );
  };
  
  const updateTodo = async (todo: any) => {
    try {
    await client.updateTodo(todo);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
     } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }

  };

  useEffect(() => {
    fetchAssignment();
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
       {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
      <h4>Assignment</h4>
      <FormControl
        defaultValue={assignment.title}
        className="mb-2"
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <FormControl
        as="textarea"
        rows={3}
        defaultValue={assignment.description}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        type="date"
        className="mb-2"
        defaultValue={assignment.due}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          defaultChecked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />

      {/* HEADER: "Todos" + (blue plus, green plus) aligned to the right */}
      <h4 className="d-flex align-items-center justify-content-between">
        <span>Todos</span>
        <span className="d-flex align-items-center gap-2">
          {/* order matches screenshot: blue then green */}
          <FaPlusCircle
            onClick={postNewTodo}
            className="text-primary fs-3"
            id="wd-post-todo"
            title="Post New Todo"
          />
          <FaPlusCircle
            onClick={createNewTodo}
            className="text-success fs-3"
            id="wd-create-todo"
            title="Create New Todo"
          />
        </span>
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            {/* right-side action cluster: pencil, delete (Ti), trash — side-by-side */}
            <span className="float-end d-flex align-items-center gap-2 mt-1">
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary"
                title="Edit"
              />
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger fs-3"
                id="wd-delete-todo"
                title="Delete (server)"
              />
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger"
                id="wd-remove-todo"
                title="Remove (client)"
              />
            </span>

            {/* left-side: checkbox + title or input when editing */}
            <input
              type="checkbox"
              className="form-check-input me-2"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 d-inline-block"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
