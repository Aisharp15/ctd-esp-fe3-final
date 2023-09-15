import React, {useState} from "react";


const Form = () => {
  //Aqui deberan implementar el form completo con sus validaciones

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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
      setMessageType("success");
      setShowMessage(true);
      setMessage(`Gracias ${name}, te contactaremos cuanto antes vía mail.`);
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setMessageType("");
        setShowMessage(false);
      }, 2000);
    }
    else{
      setMessageType("error");
      setShowMessage(true);
      setMessage("Por favor, verifique su información nuevamente.")
    }
  }


  const messageStyle = {
    position: 'absolute',
    width: '100%',
    borderRadius: '10px',
    height: 'auto',
    padding: '15px 0',
    opacity:  showMessage ? 1 : 0,
    backgroundColor: messageType === "success" ? '#3bb143' : '#800000',
    zIndex: 1,
    textAlign: "center",
    transition: 'all 0.2s ease'
  }

  return (
    <>
    <form noValidate onSubmit={(e) => {handleFormSubmit(e)}}>
      <div className="form-container">
        <div>
          <label htmlFor="input-nombre" className="input-field">
            <input id="input-nombre" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <span className="placeholder">Nombre completo</span>
          </label>
        </div>
        <div>
        <label htmlFor="input-email" className="input-field">
          <input id="input-email" type="email"  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          <span className="placeholder">Correo electrónico</span>
        </label>
        </div> 
      </div>
      <div>
        <input type="submit" value="Enviar" className="rounded-button text-button" />
      </div>
    </form>
    <div style={messageStyle} className="form-message">  
        <p>{message}</p>
      </div>
    </>
    
    
  );
};

export default Form;
