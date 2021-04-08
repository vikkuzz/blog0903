/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { getCurrentUser, articlesFetchData } from '../../redux/actions';

import Header from '../Header';
import PostList from '../PostList';
import OneArticle from '../OneArticle';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';
import UserArticle from '../UserArticle';
import EditArticle from '../EditArticle';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { page } = useSelector((state) => state.articlesReducer);

  useEffect(() => {
    if (cookies.token) {
      dispatch(getCurrentUser(cookies.token));
      dispatch(articlesFetchData(page * 20 - 20, cookies.token));
    }
    window.scroll(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Route
          path="/articles/:id"
          component={({ match }) => {
            const { id } = match.params;

            return <OneArticle itemId={id} />;
          }}
          exact
        />
        <Route
          path="/articles/:id/edit"
          component={({ match }) => {
            const { id } = match.params;
            return <EditArticle itemId={id} />;
          }}
          exact
        />
        <Route path="/" component={PostList} exact />
        <Route path="/articles" component={PostList} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/new-article" component={UserArticle} exact />
      </div>
    </BrowserRouter>
  );
};

export default App;
