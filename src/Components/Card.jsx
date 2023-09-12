import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { ContextGlobal } from "./utils/global.context";


const Card = ({ name, username, id }) => {

  const {state, dispatch} = useContext(ContextGlobal);

  const isDentistInFavs = state.favs.some((dentist) => dentist.id === id);

  const addFav = () => {
    let updatedFavs;
    if (isDentistInFavs) {
      updatedFavs = state.favs;
      alert("The dentist is already in the favs list.");
    } else {
      const dentistToAdd = state.data.find((dentist) => dentist.id === id);
      updatedFavs = [...state.favs, dentistToAdd];
    }
    dispatch({ type: "favListUpdate", payload: updatedFavs });
  };

  

  const removeFav = () => {
    let updatedFavs;
    if (isDentistInFavs) {
      updatedFavs = state.favs.filter((dentist) => dentist.id !== id);
    } else {
      updatedFavs = state.favs;
      alert("The dentist cannot be removed, as they are not in the favs list.");
    }
  
    dispatch({ type: "favListUpdate", payload: updatedFavs });
  }

  return (
    <div className="card">
      <Link to={`/dentist/${id}`}>    
          <img src="/images/doctor.jpg" alt="doctors pic" />

          <p>{name}</p>
          <p>{username}</p>
      </Link>
      <div className="button-container">
        <button onClick={addFav} className="add-to-fav-button favButton">Add fav</button>
        <button onClick={removeFav} className="remove-from-fav-button favButton">Remove fav</button>
      </div>
    </div>
  );
};

export default Card;
