/* eslint-disable */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faUser, faBars, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export default class SideBar extends React.Component {
  state = {
    isVisible: false,
  };

  toggleSideBar = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const { isVisible } = this.state;
    return (
      /* Toogle button to activate sidebar */
      <>
        <div className="flex md:hidden fixed top-0 left-0 z-20">
          <button
            className="flex items-center justify-center h-16 w-16 text-white hover:bg-slate-800 transition-colors duration-300"
            onClick={ this.toggleSideBar }
          >
            <FontAwesomeIcon icon={ faBars } className="text-xl hover:scale-110 transition-transform" />
          </button>
        </div>

        <div
          className={ `flex-col h-screen fixed bg-gradient-to-b from-[var(--color-dark-light)] to-[var(--color-dark)] shadow-lg ${
            !isVisible ? 'hidden' : 'flex'
          } md:flex transition-all duration-500 ease-in-out z-10 border-r border-[var(--color-primary-light)]/20` }
        >
          <div className="w-20 py-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-8 shadow-lg shadow-purple-700/20">
              <FontAwesomeIcon icon={ faMusic } className="text-white text-xl pulse" />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <SideBarButton 
                to="/" 
                icon={faHome} 
                title="Página Inicial" 
              />
              
              <SideBarButton 
                to="/favorites" 
                icon={faHeart} 
                title="Músicas Favoritas" 
              />
              
              <SideBarButton 
                to="/profile" 
                icon={faUser} 
                title="Perfil" 
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Componente de botão da barra lateral
function SideBarButton({ to, icon, title }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} title={title}>
      <button 
        className={`flex items-center justify-center h-12 w-12 rounded-xl
          ${isActive 
            ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-md shadow-purple-700/30' 
            : 'text-[var(--color-light-muted)] hover:text-white hover:bg-[var(--color-dark-light)]'
          }
          transition-all duration-300 ease-in-out hover:scale-110`}
      >
        <FontAwesomeIcon icon={icon} className={`${isActive ? 'text-lg' : 'text-base'}`} />
      </button>
    </Link>
  );
}
