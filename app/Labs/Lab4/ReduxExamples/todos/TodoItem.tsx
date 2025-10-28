"use client";
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem
      id={`wd-todo-${todo.id}`}
      className=" d-flex align-items-center gap-2 border-top-0 border-start-1 border-end-1"
      style={{ maxWidth: 680 }}
    >
    
      <div className="d-flex gap-2">
        <Button
          id="wd-delete-todo-click"
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          className="px-4"
        >
          Delete
        </Button>
        <Button
          id="wd-set-todo-click"
          variant="primary"
          onClick={() => dispatch(setTodo(todo))}
          className="px-4"
        >
          Edit
        </Button>
      </div>

      
      <span className="fs-4">{todo.title}</span>
    </ListGroupItem>
  );
}
