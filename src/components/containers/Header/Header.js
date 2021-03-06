/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { logout } from '../../../redux/actions/userActions';
import { articlesFetchData, getMyArticles } from '../../../redux/actions/articlesActions';

import './Header.scss';
import backgroundAvatar from '../../../img/background-avatar.png';

const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { page } = useSelector((state) => state.articlesReducer);
  const dispatch = useDispatch();
  const [cookies, remove] = useCookies();

  const token = user ? user.token : null;

  let avatar = null;
  let username = null;

  const handleClick = () => {
    remove('token', '', {
      'max-age': -1,
    });
    dispatch(logout());
    dispatch(articlesFetchData());
  };

  if (user) {
    avatar = !user.image ? backgroundAvatar : user.image;
    username = user.username;
  }
  const noLogin = (
    <div>
      <Link to="/sign-up">
        <button type="button" className="header__login header__button">
          Зарегистрироваться
        </button>
      </Link>
      <Link to="/sign-in">
        <button type="button" className="header__registration header__button">
          Войти
        </button>
      </Link>
    </div>
  );

  const login = (
    <div>
      <Link to="/">
        <button
          type="button"
          className="header__create-article header__button"
          onClick={() => dispatch(getMyArticles(user.username, user.token))}
        >
          Мои статьи
        </button>
      </Link>

      <Link to="/new-article">
        <button type="button" className="header__create-article header__button">
          Написать статью
        </button>
      </Link>

      <Link to="/profile">
        <button type="button" className="header__profile header__button">
          <span className="header__username">{username}</span>
          <img className="header__avatar" alt="avatar" src={avatar} />
        </button>
      </Link>

      <button type="button" className="header__logout header__button" onClick={handleClick}>
        Выйти
      </button>
    </div>
  );

  let menu = null;

  if (!user) {
    menu = noLogin;
  } else menu = login;

  return (
    <header className="header">
      <Link to="/">
        <button
          className="header__link header__button"
          type="button"
          onClick={() => dispatch(articlesFetchData(page * 20 - 20, token))}
        >
          Все статьи
        </button>
      </Link>
      {menu}
    </header>
  );
};

export default Header;
