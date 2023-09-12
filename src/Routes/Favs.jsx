import React, {useContext} from "react";
import Card from "../Components/Card";
import { ContextGlobal } from '../Components/utils/global.context'

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {

  const { state, dispatch } = useContext(ContextGlobal);

  const removeAllFavs = () => {
    dispatch({ type: "favListUpdate", payload: [] });
  };

  return (
    <>
      <div className="container">
        <h1>Dentists Favs</h1>
        { state.favs.length > 0 ? 
        <>
          <button className="rounded-button" onClick={removeAllFavs}>Borrar </button>
            <div className='card-grid'>
              {state.favs.map((dentist) => (
                <Card 
                key={dentist.id}
                name={dentist.name}
                username={dentist.username}
                id={dentist.id} />
              ))}
            </div>
          </>
        :
        <h2>The favs list is empty.</h2>
        }
      </div>
    </>
  );
};

export default Favs;
