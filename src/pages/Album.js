import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
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
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    console.log(data);

    this.setState({
      songs: data.filter((el) => el.trackName),
      artist: data[0].artistName,
      albumName: data[0].collectionName,
      artworkUrl100: data[0].artworkUrl100,
    });
  }

  render() {
    const { artist, albumName, songs, artworkUrl100 } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album" className="container flex">
          <aside className="description">
            <h3 data-testid="artist-name">{artist}</h3>
            <h3 data-testid="album-name">
              {albumName}

            </h3>
            <img
              src={ artworkUrl100 }
              className="albumImg"
              alt={ `Album  of ${artist}` }
            />
          </aside>

          <section className="songs">
            {songs.map((song) => <MusicCard { ...song } key={ song.trackId } />)}
          </section>
        </div>
      </>
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
