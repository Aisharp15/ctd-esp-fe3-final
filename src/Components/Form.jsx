import React, {useState} from "react";

const Form = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [shrinkErrorMessage, setShrinkErrorMessage] = useState(false);

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
      setShrinkErrorMessage(false);
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
      setShrinkErrorMessage(false);
      setMessage("Por favor, verifique su información nuevamente.")
      setTimeout(() => {
        setShrinkErrorMessage(true);
      }, 2000)
    }
  }

  const errorMessageStyle = {
    zIndex: showMessage ? 0 : -1,
    position: 'absolute',
    bottom: shrinkErrorMessage ? "-60px" : 0,
    width: '100%',
    height: shrinkErrorMessage ? "auto" : (showMessage ? "100%" : 0),
    padding:  '15px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    borderRadius: '10px',
    opacity:  showMessage ? 1 : 0,
    backgroundColor: "rgba(128, 0, 0, 0.7)",
    backdropFilter: "blur(9px)",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const successMessageStyle = {
    zIndex: showMessage ? 0 : -1,
    position: 'absolute',
    bottom: '-60px',
    width: '100%',
    height: showMessage ? "100%" : 0,
    padding:  '45px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    textAlign: "center",
    borderRadius: '10px',
    opacity:  showMessage ? 1 : 0,
    backgroundColor: 'rgba(59, 177, 67, 0.7)',
    backdropFilter: "blur(9px)",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  return (
    <div className="contact-container">
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
      <div style={messageType === "error" ? errorMessageStyle : successMessageStyle} className="form-message">  
          <p>{message}</p>
      </div>
    </div>
  );
};

export default Form;
