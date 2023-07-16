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
      <main className="min-h-[100vh] bg-slate-900 overflow-auto">
        <SideBar />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route
            path="/favorites"
            render={ (props) => (<Favorites
              { ...props }
              favoriteSongs={ favoriteSongs }
              attSongs={ this.attSongs }
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
      </main>
    );
  }
}

export default Content;
