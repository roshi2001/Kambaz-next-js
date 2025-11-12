"use client";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((s: any) => s.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem
      className="rounded-3 border d-flex flex-column gap-2 p-3"
      style={{ maxWidth: 680 }}
    >
      
      <div className="d-flex gap-2">
        <Button
          id="wd-add-todo-click"
          variant="success"
          onClick={() => dispatch(addTodo(todo))}
          className="px-4"
        >
          Add
        </Button>
        <Button
          id="wd-update-todo-click"
          variant="warning"
          onClick={() => dispatch(updateTodo(todo))}
          className="px-4"
        >
          Update
        </Button>
      </div>

      
      <FormControl
        id="wd-todo-title"
        value={todo.title ?? ""}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Learn Mongo"
        className="py-3 rounded-3"
      />
    </ListGroupItem>
  );
}
