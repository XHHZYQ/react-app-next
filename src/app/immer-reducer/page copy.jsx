'use client';

import React, { memo, useCallback } from "react";
import { useImmerReducer } from "use-immer";

const Todo = memo(({ todo, onToggle }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => onToggle(todo.id)}
    />
    {todo.title}
  </li>
));

const initialState = [
  {
    id: "React",
    title: "Learn React",
    done: true
  },
  {
    id: "Immer",
    title: "Try immer",
    done: false
  }
];
const reducer = (draft, action) => {
  switch (action.type) {
    case "toggle":
      const todo = draft.find((todo) => todo.id === action.id);
      todo.done = !todo.done;
      break;
    case "add":
      draft.push({
        id: action.id,
        title: "A new todo",
        done: false
      });
      break;
    default:
      break;
  }
};

const TodoList = () => {
  const [toDos, dispatch] = useImmerReducer(reducer, initialState);
  const unfinishedTodoCount = toDos.filter((todo) => todo.done === false).length;

  const handleToggle = useCallback((id) => {
    dispatch({ type: "toggle", id });
  }, []);

  const handleAdd = useCallback(() => {
    dispatch({ type: "add", id: "todo_" + Math.random() });
  }, []);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>

      <ul>
        {toDos.map((todo) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishedTodoCount}
    </div>
  );
};

export default TodoList;
