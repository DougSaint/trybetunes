import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
  render() {
    return (
      <header className="bg-slate-900 text-[#fffbeb]">
        <nav className="nav flex justify-between">
          <Link to="/" className="mx-2">
            <FontAwesomeIcon icon={ faHome } />
          </Link>

          <Link to="/favorites" className="mx-2">
            <FontAwesomeIcon icon={ faHeart } />
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
