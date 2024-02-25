'use client';

import React, { memo, useCallback } from 'react';
import { useImmerReducer } from 'use-immer';
import { Button } from 'antd';

const initialState = [
  {
    id: 'React',
    title: 'Learn React',
    done: true
  },
  {
    id: 'Immer',
    title: 'Try immer',
    done: false
  }
];

const reducer = (draft, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      draft.push({
        id: action.id,
        title: action.title,
        done: false
      });
      break;
    
    case 'DELETE_TODO':
      draft.splice(action.index, 1);
      break;
    case 'TOGGLE_TODO':
      draft[action.index].title = '修改了';
      break;
  }
};

export default () => {
  const [toDos, dispatch] = useImmerReducer(reducer, initialState);

  const handleAddTodo = useCallback(() => {
    dispatch({
      type: 'ADD_TODO',
      id: Date.now(),
      title: '新增项'
    });
  }, []);
  const handleDeleteTodo = useCallback((index) => {
    dispatch({
      type: 'DELETE_TODO',
      index
    });
  }, []);

  const handleToggleTodo = useCallback((index) => {
    dispatch({
      type: 'TOGGLE_TODO',
      index
    });
  }, []);

  return (
    <>
      <Button onClick={handleAddTodo}>添加 todo</Button>
      <Button onClick={() => handleDeleteTodo(0)}>删除 todo</Button>
      <Button onClick={() => handleToggleTodo(0)}>修改 todo</Button>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};
