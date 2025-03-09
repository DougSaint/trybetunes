/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import './MusicCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faCirclePlay, 
  faClock,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
    isHovered: false,
  };

  async componentDidMount() {
    const favoriteSongs = (await getFavoriteSongs()) || [];
    this.setState({ loading: true });

    const { trackId } = this.props;
    if (favoriteSongs.some((song) => song.trackId === trackId)) {
      this.setState({ isFavorite: true });
    }
    this.setState({ loading: false });
  }

  favorite = async () => {
    this.setState({ loading: true });
    const { attSongs } = this.props;
    if (this.state.isFavorite === false) {
      this.setState({ isFavorite: true });
      await addSong({ ...this.props });
      this.setState({ loading: false }, attSongs);
    } else {
      this.setState({ isFavorite: false });
      await removeSong({ ...this.props });
      await attSongs();
      this.setState({ loading: false });
    }
  };

  // Formata a duração da música em minutos:segundos
  formatDuration = (milliseconds) => {
    if (!milliseconds) return '--:--';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  setHovered = (isHovered) => {
    this.setState({ isHovered });
  };

  render() {
    const { trackId, trackName, previewUrl, setSelectedSong, trackTimeMillis, trackNumber } = this.props;
    const { loading, isFavorite, isHovered } = this.state;

    return (
      <div 
        className="relative group px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[var(--color-dark-light)]" 
        onMouseEnter={() => this.setHovered(true)}
        onMouseLeave={() => this.setHovered(false)}
      >
        {loading && <Loading />}
        
        <div className="flex justify-between items-center">
          {/* Parte esquerda: número da faixa e ícone de play */}
          <div className="flex items-center space-x-4 w-[50%]">
            <div className="w-6 text-center text-[var(--color-light-muted)] group-hover:hidden">
              {trackNumber}
            </div>
            
            <div className="hidden group-hover:block">
              <FontAwesomeIcon
                icon={ faCirclePlay }
                onClick={ () => setSelectedSong(this.props) }
                className="w-6 cursor-pointer text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-200 hover:scale-110 transform"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[var(--color-light)] font-medium text-ellipsis overflow-hidden whitespace-nowrap group-hover:text-[var(--color-primary-light)] transition-colors duration-300">
                {trackName}
              </p>
            </div>
          </div>
          
          {/* Parte direita: duração e botões de ação */}
          <div className="flex items-center space-x-4">
            {/* Duração da música */}
            <div className="flex items-center space-x-1 text-[var(--color-light-muted)] text-sm">
              <FontAwesomeIcon icon={ faClock } className="text-xs opacity-70" />
              <span>{this.formatDuration(trackTimeMillis)}</span>
            </div>
            
            {/* Botão de favorito */}
            <button
              className="bg-none w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-dark)]/30"
              onClick={ this.favorite }
              title={ isFavorite ? 'Remover dos favoritos' : 'Favoritar' }
            >
              <FontAwesomeIcon
                icon={ faHeart }
                className={`
                  ${isFavorite ? 'text-[var(--color-success)]' : 'text-[var(--color-light-muted)]'} 
                  transition-all duration-300 
                  ${isFavorite ? 'scale-110' : 'group-hover:text-[var(--color-light)]'}
                `}
                style={isFavorite ? { filter: 'drop-shadow(0 0 3px rgba(16, 185, 129, 0.5))' } : {}}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackTimeMillis: PropTypes.number,
  trackNumber: PropTypes.number,
}.isRequired;

export default MusicCard;
