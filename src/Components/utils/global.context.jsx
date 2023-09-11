import { createContext, useReducer, useMemo } from "react";
import axios from 'axios';
import { useEffect } from "react";

export const initialState = {theme: "light", data: [], favs: JSON.parse(localStorage.getItem("favs")) || []}

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  const [state, dispatch] = useReducer(reducer, initialState);

  const memoizedState = useMemo(() => state, [state]);

  function reducer(state, action) {
    switch (action.type) {
      case "themeChange":
        return {
          ...state,
          theme: action.payload
        };

      case "dentistListFetch":
        return {
          ...state,
          data: action.payload
        }
      case "addOrRemoveDentistFromFav":
        return {
          ...state,
          favs: action.payload
        };
      default:
        return state;
    }
  }


  async function fetchDentistList(){
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      // console.log(response.data);
      return response.data;
    }
    catch(error) {
      console.error("Error fetching dentists: " + error);
    }
  }
  
  async function handleDentistListFetch() {
    const data = await fetchDentistList();
    dispatch({ type: "dentistListFetch", payload: data });
  }

  function handleThemeChange() {
    let theme = state.theme === "light" ? "dark" : "light";
    dispatch({ type: "themeChange", payload: theme });
  };


  useEffect(() => {
    handleDentistListFetch();
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);
  

  return (
    <ContextGlobal.Provider value={{state: memoizedState, dispatch, handleThemeChange}}>
      {children}
    </ContextGlobal.Provider>
  );
}