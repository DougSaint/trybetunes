import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isDisabled: true,
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

  render() {
    const { userName, isDisabled } = this.state;
    return (
      <div data-testid="page-login">
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
            data-testid="login-submit-button"
            onClick={ () => {
              createUser({ name: userName });
            } }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
