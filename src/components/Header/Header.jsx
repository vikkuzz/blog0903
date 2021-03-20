
import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => (

  <header className="header">
    <Link className='header__link' to="/">О боже, это же бложег!</Link>
    <div>
      <Link to="/sign-up">
        <button type="button" className="header__login">
          Зарегаться
        </button>
      </Link>
      <button type="button" className="header__registration">
        Залогиниться
      </button>
    </div>
  </header>
)

export default Header;
