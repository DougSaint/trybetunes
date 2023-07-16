import React from "react";
import PropTypes from "prop-types";
import MusicCard from "../components/MusicCard";
import Loading from "../components/Loading";
import MusicBar from "../components/MusicBar";

class Favorites extends React.Component {
  state = { loading: false, selectedSong: {} };

  async componentDidMount() {
    const { attSongs } = this.props;
    this.setState({ loading: true });
    await attSongs();
    this.setState({ loading: false });
  }

  setSelectedSong = (song) => {
    this.setState({ selectedSong: song });
  };

  render() {
    const { favoriteSongs, attSongs,  } = this.props;
    const { loading, selectedSong } = this.state;
    return (
      <div  className="container w-[80vw] mx-auto mt-10">
        {loading ? (
          <Loading />
        ) : (
          <div>
            {favoriteSongs.map((song) => (
              <MusicCard
                {...song}
                key={song.trackId}
                attSongs={attSongs}
                setSelectedSong={this.setSelectedSong}
              />
            ))}
          </div>
        )}
        {selectedSong.previewUrl && <MusicBar song={selectedSong} />}
      </div>
    );
  }
}

Favorites.propTypes = {
  favoriteSongs: PropTypes.array,
  attSongs: PropTypes.func,
}.isRequired;

export default Favorites;
