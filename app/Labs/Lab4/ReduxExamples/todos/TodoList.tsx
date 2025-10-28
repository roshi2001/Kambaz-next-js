"use client";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useSelector((s: any) => s.todosReducer);

  return (
    <div className="container py-4">
      <h5 className="display-5 fw-semibold mb-3">Todo List</h5>

      <ListGroup className="rounded-3" style={{ maxWidth: 680 }}>
        <TodoForm />
  
        {todos.map((t: any) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ListGroup>

      <hr className="mt-4" />
    </div>
  );
}
