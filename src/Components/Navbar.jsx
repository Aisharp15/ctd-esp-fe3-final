import React, { useContext, useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";
import '../Styles/navbar.css';

const Navbar = () => {
  const {state, dispatch} = useContext(ContextGlobal);
  const [changeThemeIcon, setChangeThemeIcon] = useState("/images/moon-icon.svg");
  const [logoImage, setLogoImage] = useState("/images/logo.svg");
  const [activeTab, setActiveTab] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() =>{
    setActiveTab(location.pathname);
  }, [location]);

  const handleThemeChange = () => {
    if(state.theme === "light" ){
      dispatch({ type: "themeChange", payload: "dark" });
      setChangeThemeIcon("/images/sun-icon.svg");
      setLogoImage("/images/logo-dark.svg");
    } 
    else {
      dispatch({ type: "themeChange", payload: "light" });
      setChangeThemeIcon("/images/moon-icon.svg");
      setLogoImage("/images/logo.svg");
    }
  };

  const startAnimation = () => {
    setIsAnimating(true);
  }

  const endAnimation = () => {
    setIsAnimating(false);
  }

  return (
    <nav>
      <div className='navbar-logo-container'>
        <Link to={`/`}>
          <img src={logoImage} alt="logo" className='navbar-logo'/>
        </Link>
      </div>
      <div className='navbar-links-container'>
        <div className='navbar-links'>
          <Link to={`/`} className={activeTab === '/' ? 'active': ''}>Inicio</Link>
          <Link to={`/contact`} className={activeTab === '/contact' ? 'active' : ''}>Contacto</Link>
          <Link to={`/favs`} className={activeTab === '/favs' ? 'active' : ''}>Favoritos</Link>
          <div className="navbar-underline" style={{ left: activeTab === '/' ? '0%' : activeTab === '/contact' ? '33%' : '66%' }}></div>
        </div>
        <button className="rounded-button change-theme-button" onClick={handleThemeChange} onMouseEnter={startAnimation} onAnimationEnd={endAnimation}>
          <img className={`icon ${isAnimating && 'animate-theme-button'}`} src={changeThemeIcon} alt="" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar;