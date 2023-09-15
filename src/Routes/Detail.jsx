import React, { useContext } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";

const Detail = () => {
  const { id } = useParams();
  const { state } = useContext(ContextGlobal);

  const dentist = state.data.find((dentist) => dentist.id === parseInt(id));
  const navigate = useNavigate();

  return (
    <>
      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="rounded-button">
          <img className="icon" src="/images/back-arrow.svg" alt="back button" />
        </button>
      </div>
      <div className="container">
        <h1>Detalles del dentista con ID: {dentist.id} </h1>
          {dentist &&
          <div >
            <table>
              <tbody>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Sitio web</th>
                </tr>
                <tr>
                  <td>{dentist.name}</td>
                  <td>{dentist.email}</td>
                  <td>{dentist.phone}</td>
                  <td>{dentist.website}</td>
                </tr>
              </tbody>
            </table>
          </div>}
      </div>
    </>
  )
}

export default Detail;