/* eslint-disable */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ApiSearch from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import logo from '../assets/logo.png';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    searchMusic: '',
    isDisabledButton: true,
    loading: false,
    search: [],
    searchComplete: false,
    lastSearch: '',
  };

  suggestions = ['Charlie Brown Jr', 'Legiao Urbana', 'Raimundos', 'Belchior'];

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
    this.setState(
      {
        searchMusic: '',
        lastSearch: search,
        searchComplete: false,
      },
      () => {
        this.setState({ loading: true });
      },
    );
    const response = await ApiSearch(search);
    this.setState({
      search: response,
      searchComplete: true,
      loading: false,
    });
  };

  render() {
    const {
      searchMusic,
      isDisabledButton,
      search,
      searchComplete,
      lastSearch,
      loading,
    } = this.state;

    const matchAlbums = (
      <h3>
        Resultado de álbuns de:
        {lastSearch}
      </h3>
    );

    return (
      <>
        <img src={ logo } alt="logo" className="logo mx-auto mb-[10vh]" />
        <div className="flex justify-center items-center flex-col">
          <div className="forms w-[80vw] lg:w-[60vw] ">
            <label className="relative block rounded-xl w-full mx-auto">
              <span className="sr-only">Search</span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-3 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="text"
                name="searchMusic"
                placeholder="Pesquisar artista"
                value={ searchMusic }
                onChange={ this.onInputChange }
                onKeyUp={ (e) => e.key === 'Enter' && searchMusic && this.searchAlbum() }
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                <FontAwesomeIcon
                  icon={ faSearch }
                  onClick={ this.searchAlbum }
                  disabled={ isDisabledButton }
                />
              </span>
            </label>

            <div className="flex justify-center items-center flex-col">
              <h3 className="text-slate-100 text-xl mt-10">
                Sugestões de artistas:
              </h3>
              <div className="flex justify-center items-center flex-wrap">
                {this.suggestions.map((suggestion) => (
                  <button
                    key={ suggestion }
                    className="bg-slate-900 text-slate-100 rounded-xl px-3 py-2 m-2"
                    onClick={ () => {
                      this.setState({ searchMusic: suggestion }, () => {
                        this.searchAlbum();
                      });
                    } }
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {searchComplete && search.length > 1 && matchAlbums}
          {searchComplete && search.length < 1 && (
            <h3>Nenhum álbum foi encontrado</h3>
          )}

          <section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-[80vw] lg:w-[60vw]">
            {loading && <Loading />}
            {searchComplete
              && search.map((album) => (
                <AlbumCard key={ album.collectionId } { ...album } />
              ))}
          </section>
        </div>
      </>
    );
  }
}

export default Search;
