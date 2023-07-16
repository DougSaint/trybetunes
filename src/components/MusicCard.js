/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import './MusicCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
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

  render() {
    const { trackId, trackName, previewUrl, setSelectedSong } = this.props;
    const { loading, isFavorite } = this.state;

    return (
      <div className="flex justify-between my-2 ">
        {loading && <Loading />}
        <div className="flex max-w-[60%]">
          <FontAwesomeIcon
            icon={ faCirclePlay }
            onClick={ () => setSelectedSong(this.props) }
            className="min-w-8 max-w-8 px-2 my-auto cursor-pointer hover:text-slate-400 text-white "
          />
          <p className="text-slate-50 font-italic text-ellipsis overflow-hidden whitespace-nowrap ">{trackName}</p>
        </div>

        <div className="flex">
          <button
            className="bg-none"
            onClick={ this.favorite }
            title={ isFavorite ? 'Remover dos favoritos ' : 'Favoritar' }
          >
            <FontAwesomeIcon
              icon={ faHeart }
              className={ isFavorite ? 'text-green-600 :' : 'text-slate-50' }
            />
          </button>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
