/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, artworkUrl100, collectionId } = this.props;
    return (
      <div key={ collectionId } className="my-2 w-[100px] mx-auto" title={ collectionName }>
        <Link
          className="card-name text-ellipsis overflow-hidden whitespace-nowrap text-center"
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ artworkUrl100 }
            alt={ `Album of ${artistName}` }
            className="mx-auto rounded-full pb-1"
          />
          {collectionName}
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
}.isRequired;

export default AlbumCard;
