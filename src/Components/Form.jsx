import React, {useState} from "react";


const Form = () => {
  //Aqui deberan implementar el form completo con sus validaciones

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  function validateName(value){
    return (value.length > 5);
  }

  function validateEmail(value){
    const regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,4}');
    return regex.test(value);
  }

  function handleFormSubmit(e){
    e.preventDefault();
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    if(isNameValid && isEmailValid) {
     setMessage(`Gracias ${name}, te contactaremos cuanto antes vía mail.`)
    }
    else{
      setMessage("Por favor, verifique su información nuevamente.")
    }
  }


  return (
    <div>
      <form  noValidate onSubmit={(e) => {handleFormSubmit(e)}}>
        <div>
          <label htmlFor="input-nombre">Nombre completo</label>
          <input id="input-nombre" type="text" placeholder="Ingresa tu nombre completo" onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div>
          <label htmlFor="input-email">Correo electrónico</label>
          <input id="input-email" type="email" placeholder="Ingresa tu correo electrónico" onChange={(e) => {setEmail(e.target.value)}}/>
          
        </div>
        <div>
          <input type="submit" value="Enviar" />
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Form;
