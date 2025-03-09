import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Album from '../pages/Album';
import NotFound from '../pages/NotFound';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import SideBar from './SideBar';

class Content extends React.Component {
  state = {
    favoriteSongs: [],
    isLoading: true,
  };

  async componentDidMount() {
    await this.attSongs();
  }

  attSongs = async () => {
    this.setState({ isLoading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ 
      favoriteSongs: favSongs,
      isLoading: false 
    });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <main className="min-h-screen bg-[var(--color-dark)] overflow-x-hidden">
        <SideBar />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route
              path="/favorites"
              render={ (props) => (<Favorites
                { ...props }
                favoriteSongs={ favoriteSongs }
                attSongs={ this.attSongs }
                isLoading={ isLoading }
              />) }
            />

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
        </div>
      </main>
    );
  }
}

export default Content;
