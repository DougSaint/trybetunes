/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
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

    this.setState({
      songs: data.filter((el) => el.trackName),
      artist: data[0].artistName,
      albumName: data[0].collectionName,
      artworkUrl100: data[0].artworkUrl100,
      copyright: data[0].copyright,
    });
  }

  render() {
    const { artist, albumName, songs, artworkUrl100, copyright, selectedSong } = this.state;
    const { attSongs } = this.props;
    return (
      <div className="container w-[80vw] mx-auto mt-10">
        <aside className="flex  ">
          <img
            src={ artworkUrl100 }
            className="rounded-full"
            alt={ `Album  of ${artist}` }
          />
          <div className="flex flex-col justify-between pl-5">
            <h3 className=" py-2 mt-4  text-xl text-gray-200 hover:text-gray-200">
              {albumName}
            </h3>

            <h3 className="text-slate-100 ">
              Artista:
              {' '}
              <span className=" py-2 mt-4 text-gray-200 hover:text-gray-200">
                {artist}
                {' '}
              </span>
            </h3>

            {copyright && (
              <span className="text-slate-50/50 text-xs self-align-end">
                {' '}
                {copyright}
              </span>
            )}
          </div>
        </aside>

        <section className="songs mt-10">
          {songs.map((song) => (
            <MusicCard
              { ...song }
              key={ song.trackId }
              attSongs={ attSongs }
              setSelectedSong={ this.setSelectedSong }
            />
          ))}
        </section>

        {selectedSong.previewUrl && <MusicBar song={ selectedSong } />}
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
