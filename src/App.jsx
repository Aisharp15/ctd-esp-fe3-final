import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Layout from "./Routes/Layout";
import Detail from "./Routes/Detail";
import Contact from "./Routes/Contact";
import Favs from "./Routes/Favs";
import { ContextProvider } from "./Components/utils/global.context";

function App() {
  return (
    <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<Layout/>}>
          <Route index element={<Home/>}/>
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="dentist/:id" element={<Detail/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="favs" element={<Favs/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;

