/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { logout } from '../../redux/actions';

import './Header.scss';
import backgroundAvatar from '../../img/background-avatar.png';

const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [cookies, remove] = useCookies();

  let avatar = null;
  let username = null;

  const handleClick = () => {
    remove('token', '', {
      'max-age': -1,
    });
    dispatch(logout());
  };

  if (user) {
    avatar = !user.image ? backgroundAvatar : user.image;
    username = user.username;
  }

  const noLogin = (
    <div>
      <Link to="/sign-up">
        <button type="button" className="header__login header__button">
          Зарегаться
        </button>
      </Link>
      <Link to="/sign-in">
        <button type="button" className="header__registration header__button">
          Залогиниться
        </button>
      </Link>
    </div>
  );

  const login = (
    <div>
      <Link to="/sign-up">
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

      <Link to="/">
        <button type="button" className="header__logout header__button" onClick={handleClick}>
          Разлогиниться
        </button>
      </Link>
    </div>
  );

  let menu = null;

  if (!user) {
    menu = noLogin;
  } else menu = login;

  return (
    <header className="header">
      <Link className="header__link header__button" to="/">
        О боже, это же бложег!
      </Link>
      {menu}
    </header>
  );
};

export default Header;
