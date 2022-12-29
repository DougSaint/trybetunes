import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  render() {
    const { favoriteSongs, attSongs } = this.props;

    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {favoriteSongs.map((song) => (<MusicCard
            { ...song }
            key={ song.trackId }
            attSongs={ attSongs }
          />))}
        </div>
      </>
    );
  }
}

Favorites.propTypes = {
  favoriteSongs: PropTypes.array,
  attSongs: PropTypes.func,
}.isRequired;

export default Favorites;
