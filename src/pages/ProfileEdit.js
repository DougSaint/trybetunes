import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    user: {
      name: '',
      description: '',
      email: '',
      image: '',
    },
  };

  async componentDidMount() {
    const userData = await getUser();
    this.setState({ user: userData });
    this.setState({ loading: false });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prev) => ({
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  handleForm = async () => {
    this.setState({ loading: true });
    const { user } = this.state;
    const { history } = this.props;
    await updateUser(user);
    history.push('/profile');
  };

  validate() {
    const { user: { name, description, email, image } } = this.state;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    validateEmail = (emailToTest) => emailRegex.test(emailToTest);
    return name.length > 1 && description.length > 1
    && this.validateEmail(email) && image.length > 1;
  }

  render() {
    const { loading, user: { name, description, email, image } } = this.state;
    const disableButton = this.validate();

    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loading ? <Loading /> : (
            <div>
              <form className="edit profile-edit-form" onSubmit={ this.handleForm }>
                <label htmlFor="name" className="profile-edit-label">
                  Nome:
                  <input
                    name="name"
                    id="name"
                    type="text"
                    value={ name }
                    data-testid="edit-input-name"
                    className="profile-edit-input"
                    onChange={ this.handleChange }
                  />
                </label>

                <label
                  htmlFor="email"
                  className="profile-edit-label"
                >
                  <input
                    name="email"
                    id="email"
                    type="text"
                    value={ email }
                    data-testid="edit-input-email"
                    className="profile-edit-input"
                    onChange={ this.handleChange }
                  />
                  Email:
                </label>

                <label
                  htmlFor="description"
                  className="profile-edit-label"
                >
                  <input
                    name="description"
                    id="description"
                    type="text"
                    value={ description }
                    data-testid="edit-input-description"
                    className="profile-edit-input"
                    onChange={ this.handleChange }
                  />
                  Descrição:
                </label>

                <label htmlFor="image" className="profile-edit-label">
                  Foto:
                  <input
                    name="image"
                    id="image"
                    type="text"
                    value={ image }
                    data-testid="edit-input-image"
                    className="profile-edit-input"
                    onChange={ this.handleChange }
                  />
                </label>

                <button
                  type="submit"
                  data-testid="edit-button-save"
                  className="profile-edit-button"
                  disabled={ !disableButton }
                >
                  Salvar
                </button>
              </form>
            </div>
          )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
