import { POST_INGRESO, POST_REGISTRO, POST_GOOGLE, BORRAR_TOKEN } from "./type";
import axios from "axios";

export const ingreso = (email) => {
    return async function (dispatch) {
      try {
        const apiData = await axios.post(
          "http://localhost:3001/user/login",
          { email }
        );
        const usuario = apiData.data;
        localStorage.setItem("token", usuario.token);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        // const expirationDate = new Date(new Date().getTime() + 120 * 1000); // 2 minutos para pruebas 
        localStorage.setItem('expirationDate', expirationDate);
        dispatch({
          type: POST_INGRESO,
          payload: usuario,
        });
        return usuario;
      } catch (error) {
        alert (error.response.data.message);
      }
    };
  };

  export const registros = (email) => {
    return async function (dispatch) {
      try {
        const apiData = await axios.post(
          "http://localhost:3001/user/rigistro",
          { email }
        );
        const usuario = apiData.data;
        localStorage.setItem("token", usuario.token);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        // const expirationDate = new Date(new Date().getTime() + 120 * 1000); // 2 minutos para pruebas 
        localStorage.setItem('expirationDate', expirationDate);
        dispatch({
          type: POST_REGISTRO,
          payload: usuario,
        });
        return usuario;
      } catch (error) {
        alert (error.response.data.message);
      }
    };
  };

  export const loginUserGoogle = (email) => {
    return async function (dispatch) {
      try {
        const apiData = await axios.post(
          "http://localhost:3001/user/google",
          { email }
        );
        const usuario = apiData.data;
        localStorage.setItem("token", usuario.token);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        // const expirationDate = new Date(new Date().getTime() + 120 * 1000); // 2 minutos para pruebas 
        localStorage.setItem('expirationDate', expirationDate);
        dispatch({
          type: POST_GOOGLE,
          payload: usuario,
        });
        return usuario;
      } catch (error) {
        alert (error.response.data.message);
      }
    };
  };

  export const borrarToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("expirationDate");
    return {
      type: BORRAR_TOKEN,
      payload: {
        email: "",
        rol: "",
        token: ""
      }
    }
  };