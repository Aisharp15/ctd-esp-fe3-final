import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Navbar = () => {
  const {state, handleThemeChange } = useContext(ContextGlobal);

  return (
    <nav className={state.theme}>
      {/* Aqui deberan agregar los links correspondientes a las rutas definidas */}
      {/* Deberan implementar ademas la logica para cambiar de Theme con el button */}
      <Link to={`/home`}>Home</Link>
      <Link to={`/contact`}>Contact</Link>
      <Link to={`/favs`}>Favs</Link>
      <button onClick={handleThemeChange}>Change theme</button>
    </nav>
  )
}

export default Navbar