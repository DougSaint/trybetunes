import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isDisabled: true,
      isLoading: false,
    };
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validation);
  };

  validation = () => {
    const { userName } = this.state;
    const minLetters = 3;
    if (userName.length >= minLetters) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  saveUser = async () => {
    const { userName } = this.state; const
      { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({ isLoading: false }, () => {
      history.push('/search');
    });
  };

  render() {
    const { userName, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login" className="container">
        <form>
          <label htmlFor="userName">
            UserName
            <input
              data-testid="login-name-input"
              type="text"
              name="userName"
              value={ userName }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            className="btn"
            data-testid="login-submit-button"
            onClick={ this.saveUser }
            disabled={ isDisabled }
          >
            Entrar
          </button>
          {isLoading && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
