import React from 'react';
import ApiSearch from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchMusic: '',
    isDisabledButton: true,
    loading: false,
    search: [],
    searchComplete: false,
    lastSearch: '',
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

  searchAlbum = async () => {
    const { searchMusic } = this.state;
    const search = searchMusic;

    this.setState({
      searchMusic: '',
      lastSearch: search,
      searchComplete: false,
    }, () => { this.setState({ loading: true }); });
    const response = await ApiSearch(search);
    this.setState({
      loading: false,
      search: response,
      searchComplete: true,
    });
  };

  render() {
    const {
      searchMusic,
      isDisabledButton,
      loading,
      search,
      searchComplete,
      lastSearch } = this.state;

    const searchInput = (
      <div className="forms">
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
          onClick={ this.searchAlbum }
        >
          Pesquisar
        </button>
      </div>);

    const matchAlbums = (
      <h3>
        Resultado de álbuns de:
        {' '}
        {lastSearch}
      </h3>);

    return (
      <>
        <Header />
        <div data-testid="page-search" className="container">
          {loading ? <Loading />
            : searchInput}
          {searchComplete && search.length > 1
          && matchAlbums}
          {searchComplete && search.length < 1 && <h3>Nenhum álbum foi encontrado</h3>}
          <section>
            {searchComplete && search.map((album) => (
              <AlbumCard
                key={ album.collectionId }
                { ...album }
              />))}
          </section>
        </div>
      </>

    );
  }
}

export default Search;
