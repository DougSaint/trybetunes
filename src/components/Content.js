import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Favorites from '../pages/Favorites';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Album from '../pages/Album';
import NotFound from '../pages/NotFound';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Content extends React.Component {
  state = {
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.attSongs();
  }

  attSongs = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs: favSongs });
  };

  render() {
    const { favoriteSongs } = this.state;
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route
            path="/favorites"
            render={ (props) => (<Favorites
              { ...props }
              favoriteSongs={ favoriteSongs }
              attSongs={ this.attSongs }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
              attSongs={ this.attSongs }
            />) }
          />

          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
