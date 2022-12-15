import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends React.Component {
  state = {
    loading: true,
    clientInfo: '',
  };

  async componentDidMount() {
    const info = await getUser();
    this.setState({ clientInfo: info.name });
    this.setState({ loading: false });
  }

  render() {
    const { loading, clientInfo } = this.state;
    return (
      <header data-testid="header-component" className="header">

        <nav className="nav">
          <Link to="/search" data-testid="link-to-search" className="link">Search</Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
          >
            Profile
          </Link>
        </nav>
        {loading ? <Loading />
          : <p data-testid="header-user-name" className="user">{clientInfo}</p>}
      </header>
    );
  }
}

export default Header;
