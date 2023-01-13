import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    loading: true,
    user: {},
  };

  async componentDidMount() {
    const userData = await getUser();
    this.setState({ user: userData });
    this.setState({ loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading ? <Loading /> : (
            <div className="user-profile">
              <h2>{user.name}</h2>
              <em>{user.email}</em>
              <p>
                {' '}
                {user.description}
                {' '}
              </p>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
