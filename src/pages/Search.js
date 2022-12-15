import React from 'react';

class Search extends React.Component {
  state = {
    searchMusic: '',
    isDisabledButton: true,
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validation);
  };

  validation = () => {
    const { searchMusic } = this.state;
    const minLetters = 2;
    if (searchMusic.length >= minLetters) {
      this.setState({ isDisabledButton: false });
    } else {
      this.setState({ isDisabledButton: true });
    }
  };

  render() {
    const { searchMusic, isDisabledButton } = this.state;
    return (
      <div data-testid="page-search" className="container">
        <i className="bi bi-search" />
        <input
          data-testid="search-artist-input"
          type="text"
          name="searchMusic"
          placeholder="Pesquisar artista"
          value={ searchMusic }
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          className="btn button"
          disabled={ isDisabledButton }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
