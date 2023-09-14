import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";

const Navbar = () => {
  const {handleThemeChange } = useContext(ContextGlobal);

  return (
    <nav>
      <Link to={`/`}>Home</Link>
      {/* <Link to={`/home`}>Home</Link> */}
      <Link to={`/contact`}>Contact</Link>
      <Link to={`/favs`}>Favs</Link>
      <button className="rounded-button" onClick={handleThemeChange}>Change theme</button>
    </nav>
  )
}

export default Navbar