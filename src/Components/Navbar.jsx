import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";

const Navbar = () => {
  const {state, dispatch} = useContext(ContextGlobal);
  const [changeThemeIcon, setChangeThemeIcon] = useState("/images/moon-icon.svg");
  const [logoImage, setLogoImage] = useState("/images/logo.svg");
  function handleThemeChange() {

    if(state.theme === "light" ){
      dispatch({ type: "themeChange", payload: "dark" });
      setChangeThemeIcon("/images/sun-icon.svg");
      setLogoImage("/images/logo-dark.svg");
    } else {
      dispatch({ type: "themeChange", payload: "light" });
      setChangeThemeIcon("/images/moon-icon.svg");
      setLogoImage("/images/logo.svg");
    }
  };

  return (
    <nav>
      <div>
        <Link to={`/`}>
          <img src={logoImage} alt="logo" className='logo'/>
        </Link>
      </div>
      <div>
        <Link to={`/`}>Inicio</Link>
        {/* <Link to={`/home`}>Home</Link> */}
        <Link to={`/contact`}>Contacto</Link>
        <Link to={`/favs`}>Favoritos</Link>
        <button className="rounded-button" onClick={handleThemeChange}>
          <img className='icon' src={changeThemeIcon} alt="" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar