/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCompactDisc, faCalendar } from '@fortawesome/free-solid-svg-icons';
import MusicBar from '../components/MusicBar';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      artist: '',
      albumName: '',
      artworkUrl100: '',
      selectedSong: {},
      loading: true,
      releaseDate: '',
      primaryGenreName: '',
      trackCount: 0,
    };
  }

  setSelectedSong = (song) => {
    this.setState({ selectedSong: song });
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const data = await getMusics(id);

    if (data && data.length > 0) {
      // Obter URL de arte maior
      const artworkUrl = data[0].artworkUrl100?.replace('100x100bb', '600x600bb');
      
      this.setState({
        songs: data.filter((el) => el.trackName),
        artist: data[0].artistName,
        albumName: data[0].collectionName,
        artworkUrl100: artworkUrl || data[0].artworkUrl100,
        copyright: data[0].copyright,
        releaseDate: data[0].releaseDate,
        primaryGenreName: data[0].primaryGenreName,
        trackCount: data[0].trackCount,
        loading: false,
      });
    }
  }

  // Formatar a data em formato legível
  formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  render() {
    const { 
      artist, 
      albumName, 
      songs, 
      artworkUrl100, 
      copyright, 
      selectedSong,
      releaseDate,
      primaryGenreName,
      trackCount,
      loading,
    } = this.state;
    
    const { attSongs } = this.props;
    
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="loading__overlay__content__spinner"></div>
        </div>
      );
    }
    
    return (
      <div className="app-container ml-20 pb-32">
        {/* Cabeçalho do álbum */}
        <div className="relative">
          {/* Fundo desfocado */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-20 h-64"
            style={{ backgroundImage: `url(${artworkUrl100})` }}
          ></div>
          
          <div className="relative pt-8 px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Capa do álbum */}
              <div className="relative group min-w-[200px] max-w-[200px]">
                <img
                  src={artworkUrl100}
                  className="rounded-lg shadow-xl shadow-black/30 hover-scale transition-all duration-500"
                  alt={`Album of ${artist}`}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/80 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FontAwesomeIcon icon={faCompactDisc} className="text-white text-2xl animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
              </div>
              
              {/* Informações do álbum */}
              <div className="flex-1 slide-up">
                <div className="text-[var(--color-light-muted)] font-medium text-sm uppercase tracking-wider mb-1">
                  Álbum
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-light)] mb-2">
                  {albumName}
                </h1>
                <div className="flex items-center text-[var(--color-light-muted)] mb-4">
                  <span className="font-medium text-lg hover:text-[var(--color-primary-light)] transition-colors duration-300">
                    {artist}
                  </span>
                </div>
                
                {/* Detalhes adicionais */}
                <div className="flex flex-wrap gap-4 text-sm text-[var(--color-light-muted)]">
                  {releaseDate && (
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendar} className="opacity-70" />
                      <span>{this.formatDate(releaseDate)}</span>
                    </div>
                  )}
                  
                  {trackCount > 0 && (
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faList} className="opacity-70" />
                      <span>{trackCount} faixas</span>
                    </div>
                  )}
                  
                  {primaryGenreName && (
                    <div className="px-2 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)]">
                      {primaryGenreName}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Separador */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary-light)]/30 to-transparent my-8"></div>
            
            {/* Lista de músicas */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-[var(--color-light)] mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faList} className="text-[var(--color-primary-light)]" />
                <span>Faixas</span>
              </h2>
              
              <div className="songs mt-4 fade-in">
                {songs.map((song, index) => (
                  <div key={song.trackId} style={{ animationDelay: `${index * 0.05}s` }} className="fade-in">
                    <MusicCard
                      {...song}
                      trackNumber={index + 1}
                      attSongs={attSongs}
                      setSelectedSong={this.setSelectedSong}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Copyright */}
            {copyright && (
              <div className="mt-8 text-center">
                <span className="text-[var(--color-light-muted)]/50 text-xs">
                  {copyright}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Player de música */}
        {selectedSong.previewUrl && <MusicBar song={selectedSong} />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
