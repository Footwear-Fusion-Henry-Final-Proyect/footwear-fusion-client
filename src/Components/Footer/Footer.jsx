import { useDispatch, useSelector } from "react-redux";
import medios from "../images/mediosdepago.png";
import { useState } from "react";
import { correoRegistroNewsletter, postNewsletter, createPromo, getNewsletter } from "../../Redux/Actions";
import swal from "sweetalert";
import { html } from "./correo";
import axios from "axios";

export default function Footer() {
  const dispatch = useDispatch()
  const back = "http://localhost:3001";

  const [email, setEmail] = useState({
    email: ""
  });

  const correo = {
    email: email.email, 
    subject:"Gracias por Suscribirte!",
    html: html
  }

  const capturarEmail = (evento) => {
    const { name, value } = evento.target;
    setEmail({
      ...email,
      [name]: value
    });
  };

  const newEmail = async ()=> {
    swal("Ya estas registrado!", "Vas a recibir un correo de confirmación","success")
    setTimeout(() => {
      window.location.reload()
    }, 3000);
    await dispatch(postNewsletter(email))
    const promo = await axios.post(`${back}/promotions`);
    const promoData = promo.data
    await dispatch(correoRegistroNewsletter(correo, promoData))
  }

  return (
    <div className="footer">

      <div>
        <h5>MEDIOS DE PAGO</h5>
        <img src={medios} alt="" />
      </div>

      <h5>Suscribite a nuestro Newsletter y no te pierdas las novedades!</h5>
      <input type="text" name="email" placeholder="Ingresa tu email..." onChange={capturarEmail} />
      <button className="enviar" onClick={newEmail}>Enviar</button>

    </div>
  );
}
