import PropTypes from 'prop-types';
import React from 'react';
import './MusicCard.css';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checkbox: false,
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs() || [];
    const { trackId } = this.props;
    if (favoriteSongs.some((song) => song.trackId === trackId)) {
      this.setState({ checkbox: true });
    }
  }

  favorite = async ({ target: { checked } }) => {
    this.setState({ loading: true });
    const { attSongs } = this.props;
    if (checked) {
      this.setState({ checkbox: true });
      await addSong({ ...this.props });
      this.setState({ loading: false }, attSongs);
    } else {
      this.setState({ checkbox: false });
      await removeSong({ ...this.props });
      await attSongs();
      this.setState({ loading: false });
    }
  };

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { loading, checkbox } = this.state;

    const favoriteInput = (
      <label htmlFor={ trackId }>
        Favorita
        <input
          type="checkbox"
          name={ trackId }
          id={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.favorite }
          checked={ checkbox }
        />
      </label>
    );

    return (
      <div className="flex center">

        <div className="musicWrapper">
          <em className="musicName">{trackName}</em>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        {loading ? <Loading /> : favoriteInput}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
