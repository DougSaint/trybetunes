import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class NotFound extends React.Component {
  render() {
    return (
      <div className="container w-[80vw] mx-auto">
        <h1 className="text-slate-300 text-xl text-center mt-[15vh]">
          Página não encontrada
        </h1>
        <img src="https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif" alt="Página não encontrada" className="mx-auto" />
        <p className="text-slate-50 text-center">
          Acho que você se perdeu no caminho, que tal{" "}
          <Link className="underline font-bold" to="/">
            voltar
          </Link>
        </p>
      </div>
    );
  }
}

export default NotFound;
