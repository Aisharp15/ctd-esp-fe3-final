import React, {useContext} from "react";
import Card from "../Components/Card";
import { ContextGlobal } from '../Components/utils/global.context';

const Favs = () => {

  const { state, dispatch } = useContext(ContextGlobal);

  const removeAllFavs = () => {
    dispatch({ type: "favListUpdate", payload: [] });
  };

  return (
    <>
      <div className="container">
        <h1>Lista de Favoritos</h1>
        { state.favs.length > 0 ? 
        <>
          <button className="rounded-button text-button" onClick={removeAllFavs}>Borrar</button>
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
        <h2>Aún no tienes dentistas favoritos agregados a tu lista.</h2>
        }
      </div>
    </>
  );
};

export default Favs;
