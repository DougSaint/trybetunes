import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, artworkUrl100, collectionId } = this.props;
    return (
      <div className="card" key={ collectionId }>
        <img src={ artworkUrl100 } alt={ `Album of ${artistName}` } />
        <Link
          className="card-name"
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          {collectionName}
        </Link>
        <p className="card-author">{artistName}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;

export default AlbumCard;
