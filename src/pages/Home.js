/* eslint-disable */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMusic, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import ApiSearch from "../services/searchAlbumsAPI";
import AlbumCard from "../components/AlbumCard";
import logo from "../assets/logo.png";
import Loading from "../components/Loading";

class Search extends React.Component {
  state = {
    searchMusic: "",
    isDisabledButton: true,
    loading: false,
    search: [],
    searchComplete: false,
    lastSearch: "",
    recentSearches: [], // Armazenar pesquisas recentes
  };

  suggestions = ["Charlie Brown Jr", "Legiao Urbana", "Raimundos", "Belchior", "Metallica", "Pink Floyd"];

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
    const { searchMusic, recentSearches } = this.state;
    
    // Não realizar busca vazia
    if (!searchMusic.trim()) return;
    
    const search = searchMusic;
    
    // Adicionar à lista de pesquisas recentes (sem duplicatas)
    const updatedSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    
    this.setState(
      {
        searchMusic: "",
        lastSearch: search,
        searchComplete: false,
        recentSearches: updatedSearches,
      },
      () => {
        this.setState({ loading: true });
      }
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
      recentSearches,
    } = this.state;

    return (
      <div className="app-container ml-20 pb-20">
        <div className="flex flex-col items-center pt-10">
          <img 
            src={logo} 
            alt="logo" 
            className="logo mx-auto mb-8 hover-scale" 
          />
          
          <div className="w-full max-w-3xl px-4">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl blur opacity-20"></div>
              <div className="relative bg-[var(--color-dark-light)] rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center text-[var(--color-light)]">
                  Encontre seu artista favorito
                </h2>
                
                <div className="forms w-full">
                  <label className="relative block rounded-xl w-full mx-auto">
                    <span className="sr-only">Search</span>
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-[var(--color-dark)] w-full border border-[var(--color-primary-light)]/30 rounded-xl py-3 pl-4 pr-10 shadow-inner focus:outline-none focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-1 text-[var(--color-light)] transition-all duration-300"
                      type="text"
                      name="searchMusic"
                      placeholder="Pesquisar artista..."
                      value={searchMusic}
                      onChange={this.onInputChange}
                      onKeyUp={(e) =>
                        e.key === "Enter" && !isDisabledButton && this.searchAlbum()
                      }
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      <button
                        className={`bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg p-2 transition-all duration-300 ${
                          isDisabledButton 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105'
                        }`}
                        onClick={this.searchAlbum}
                        disabled={isDisabledButton}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </span>
                  </label>
  
                  {/* Pesquisas recentes */}
                  {recentSearches.length > 0 && !searchComplete && (
                    <div className="mt-4">
                      <h3 className="text-sm text-[var(--color-light-muted)] mb-2">Pesquisas recentes:</h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            className="bg-[var(--color-dark)] text-[var(--color-light-muted)] rounded-full px-3 py-1 text-sm border border-[var(--color-primary-light)]/20 hover:border-[var(--color-primary-light)]/50 hover:text-white transition-all duration-300"
                            onClick={() => {
                              this.setState({ searchMusic: term }, () => {
                                this.searchAlbum();
                              });
                            }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!searchComplete && (
              <div className="fade-in slide-up">
                <h3 className="text-xl font-semibold mb-4 text-center text-[var(--color-light)]">
                  Sugestões para você
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {this.suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      className={`bg-[var(--color-dark-light)] text-[var(--color-light)] rounded-xl p-4 hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 flex flex-col items-center gap-2`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => {
                        this.setState({ searchMusic: suggestion }, () => {
                          this.searchAlbum();
                        });
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={index % 2 === 0 ? faMusic : faHeadphones} 
                        className="text-2xl mb-1" 
                      />
                      <span className="text-sm text-center">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resultado da pesquisa */}
            {searchComplete && (
              <div className="mt-8 fade-in">
                {search.length > 0 ? (
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-light)]">
                    Resultados para "<span className="text-[var(--color-primary-light)]">{lastSearch}</span>"
                  </h3>
                ) : (
                  <div className="bg-[var(--color-dark-light)] rounded-xl p-6 text-center">
                    <h3 className="text-xl text-[var(--color-light)] mb-2">Nenhum álbum encontrado</h3>
                    <p className="text-[var(--color-light-muted)]">Tente outra pesquisa</p>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {loading && <Loading />}
                  {searchComplete &&
                    search.map((album, index) => (
                      <div key={album.collectionId} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <AlbumCard {...album} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
