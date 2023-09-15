import React, {useContext} from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { ContextGlobal } from '../Components/utils/global.context';

const Layout = () => {
    const {state} = useContext(ContextGlobal);
    
    return (
        <div className={`main-container ${state.theme}`}>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;
