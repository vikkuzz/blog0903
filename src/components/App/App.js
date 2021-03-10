import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { articlesFetchData } from '../../redux/actions';

import PostList from '../PostList';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(articlesFetchData());
  });

  return (
    <div className="app">
      <header className="app__header">
        <span>О боже, это же бложег!</span>
        <div>
          <button type="button" className="app__header-login">
            Логиниться
          </button>
          <button type="button" className="app__header-registration">
            Зарегаться
          </button>
        </div>
      </header>
      <PostList />
    </div>
  );
};

export default App;
