'use client';
import { useEffect, useReducer } from 'react';
import { Button } from 'antd';
import style from './detail.module.scss';
import { getUserMenu } from '@/api/index';

const initialState = { menu: [] };

const reducer = (state, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case 'init': {
      return { ...state.menu, menu: [...action.menu] };
    }
    case 'change': {
      const list = state.menu.map(item => ({ name: item.name + '修改了' }));
      return { ...state.menu, menu: [...list] };
    }
    case 'get': {
      return state;
    }
  }
};

export default () => {
  useEffect(() => {
    fetchUserMenu();
  }, []);

  const [menuList, dispatch] = useReducer(reducer, initialState);

  const fetchUserMenu = () => {
    getUserMenu().then(({ content: { menu = [] } }) => {
      dispatch({ type: 'init', menu });
      console.log('getUserMenu', menuList);
    });
  };

  const changeMenu = () => {
    dispatch({ type: 'change' });
    console.log('change menu', menuList);
  };

  const getMenu = () => {
    dispatch({ type: 'get' });
    console.log('get menu', menuList);
  };

  return (
    <main className={style['detail-container']}>
      <h1 className={style.title}>Page</h1>
      <div className={style.content}>
        <img src="imgs/教完再练.png" alt="" />
      </div>

      <Button onClick={changeMenu}>修改</Button>
      <Button onClick={getMenu}>获取</Button>

      <div className={style['detail-menu']}>
        {menuList.menu.map((item, index) => (
          <p key={index + item.id}>{item.name}</p>
        ))}
      </div>
    </main>
  );
};
