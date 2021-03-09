import React from "react";

import PostList from "../PostList";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <span>О боже, это же бложег!</span>
        <div>
          <button className="app__header-login">Логиниться</button>
          <button className="app__header-registration">Зарегаться</button>
        </div>
      </header>
      <PostList />
    </div>
  );
};

export default App;
