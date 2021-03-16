import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../Header';
import PostList from '../PostList';

import OneArticle from '../OneArticle';

import './App.scss';

const App = () => (
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
    </div>
  </BrowserRouter>
);

export default App;
