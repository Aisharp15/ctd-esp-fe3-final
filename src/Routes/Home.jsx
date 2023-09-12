import React from 'react'
import Card from '../Components/Card'
import { useContext } from 'react'
import { ContextGlobal } from '../Components/utils/global.context'

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Home = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <main >
      <h1>Home</h1>
      <div className='card-grid'>
       {state.data.map((dentist) => (
        <Card 
        key={dentist.id}
        name={dentist.name}
        username={dentist.username}
        id={dentist.id} />
       ))}


      </div>
    </main>
  )
}

export default Home