import React, { useContext } from 'react';
import Card from '../Components/Card';
import { ContextGlobal } from '../Components/utils/global.context';

const Home = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <div className='container' >
      <h1>Inicio</h1>
      <div className='card-grid'>
       {state.data.map((dentist) => (
        <Card 
          key={dentist.id}
          name={dentist.name}
          username={dentist.username}
          id={dentist.id} 
        />
       ))}
      </div>
    </div>
  )
}

export default Home;