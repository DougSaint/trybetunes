import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  state = { loading: false };

  async componentDidMount() {
    const { attSongs } = this.props;
    this.setState({ loading: true });
    await attSongs();
    this.setState({ loading: false });
  }

  render() {
    const { favoriteSongs, attSongs } = this.props;
    const { loading } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-favorites" className="favorite-song">
            {favoriteSongs.map((song) => (<MusicCard
              { ...song }
              key={ song.trackId }
              attSongs={ attSongs }
            />))}
          </div>
        )}

      </>
    );
  }
}

Favorites.propTypes = {
  favoriteSongs: PropTypes.array,
  attSongs: PropTypes.func,
}.isRequired;

export default Favorites;
