import React, { useContext, useEffect, useState} from 'react';
import { ContextGlobal } from "./utils/global.context";

const Footer = () => {
  const {state} = useContext(ContextGlobal);
  const [logoImage, setLogoImage] = useState("/images/footer-logo.svg");

  useEffect(() => {
    if(state.theme === "light" ){
      setLogoImage("/images/footer-logo.svg");
    } else {
      setLogoImage("/images/footer-logo-dark.svg");
    }
  }, [state.theme]);

  return (
    <footer>
        <p>Powered by </p>
        <img src={logoImage} alt='footer logo' className='footer-logo'/>
    </footer>
  )
}

export default Footer
