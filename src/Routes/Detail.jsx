import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Detail = () => {
  const { id } = useParams();
  const { state } = useContext(ContextGlobal);

  const dentist = state.data.find((dentist) => dentist.id === parseInt(id));
  return (
    <>
      <h1>Detail Dentist id: {dentist.id} </h1>
      {dentist &&
      <div className="container">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
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
    </>
  )
}

export default Detail;