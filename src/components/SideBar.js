import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
        <div className="flex md:hidden">
          <button
            className="flex items-center justify-center h-16 w-16 text-white hover:bg-slate-800"
            onClick={this.toggleSideBar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div
          className={` flex-col h-screen w-16 fixed bg-slate-900 shadow-lg ${
            !isVisible ? "hidden" : "flex"
          } md:flex transition-all duration-500 ease-in-out z-10`}
        >
          <Link to="/" title="Pagina Inicial">
            <button className="flex items-center justify-center h-16 w-16 text-white hover:bg-slate-800">
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>

          <Link to="/favorites" title="Musicas Favoritas">
            <button className="flex items-center justify-center h-16 w-16 text-white hover:bg-slate-800">
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </Link>
        </div>
      </>
    );
  }
}
