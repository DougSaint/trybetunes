/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { 
      artistName, 
      collectionName, 
      artworkUrl100, 
      collectionId, 
      releaseDate,
      trackCount 
    } = this.props;
    
    // Converter URL para uma imagem maior (substituir 100x100 por 300x300)
    const artworkLarger = artworkUrl100?.replace('100x100bb', '300x300bb');
    
    // Formatação da data
    const formattedDate = releaseDate 
      ? new Date(releaseDate).getFullYear() 
      : '';

    return (
      <div className="card hover-scale">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="block relative group"
          title={ `${collectionName} - ${artistName}` }
        >
          {/* Overlay de gradiente no hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          {/* Imagem do álbum */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={ artworkLarger || artworkUrl100 }
              alt={ `Album of ${artistName}` }
              className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Ícone play no hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/80 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <FontAwesomeIcon icon={faCompactDisc} className="text-white text-xl animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
          
          {/* Informações do álbum */}
          <div className="py-2">
            <h3 className="text-[var(--color-light)] font-medium truncate group-hover:text-[var(--color-primary-light)] transition-colors duration-300">
              {collectionName}
            </h3>
            <p className="text-[var(--color-light-muted)] text-sm truncate">
              {artistName}
            </p>
            
            {/* Detalhes adicionais */}
            {(formattedDate || trackCount) && (
              <div className="flex justify-between mt-1 text-xs text-[var(--color-light-muted)]/70">
                {formattedDate && <span>{formattedDate}</span>}
                {trackCount && <span>{trackCount} faixas</span>}
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.number,
}.isRequired;

export default AlbumCard;
