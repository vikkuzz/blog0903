import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import { getCurrentUser } from '../../redux/actions';

import Header from '../Header';
import PostList from '../PostList';
import OneArticle from '../OneArticle';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.token) {
      dispatch(getCurrentUser(cookies.token));
    }
  });

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
        <Route path="/" component={PostList} exact />
        <Route path="/articles" component={PostList} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/profile" component={Profile} exact />
      </div>
    </BrowserRouter>
  );
};

export default App;
