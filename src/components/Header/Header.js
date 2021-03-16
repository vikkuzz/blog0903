import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => (
  <header className="header">
    <Link to="/">О боже, это же бложег!</Link>
    <div>
      <button type="button" className="header__login">
        Логиниться
      </button>
      <button type="button" className="header__registration">
        Зарегаться
      </button>
    </div>
  </header>
);

export default Header;
