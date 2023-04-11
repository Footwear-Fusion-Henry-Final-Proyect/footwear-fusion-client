import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_ADMIN,
  GET_CATEGORY,
  GET_BRAND,
  GET_SIZE,
  GET_PUNCTUATION,
  GET_USERS,
 UPDATE_USER_SUCCESS,
 UPDATE_USER_FAILURE,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_SIZE,
  ORDER_BY_PRICE,
  ORDER_BY_BEST_SELLING,
  GET_PRICE,
  PRICE_RANGE_SELECTOR,
  ADD_TO_CART,
  ADD_QUANTITY,
  ADD_SIZE,
  ADD_FAV,
  DELETE_FAV,
  DELETE_CART,
  GET_USERS_FAVORITES,
  POST_INGRESO,
  BORRAR_TOKEN,
  POST_REGISTRO,
  POST_GOOGLE,
  GET_CART_BY_ID,
  CLOSE_SESSION,
  POST_NEWSLETTER,
  GET_NEWSLETTER,
  REGISTRO_NEWSLETTER,
  POST_MERCADO_PAGO,
  GET_MERCADO_PAGO,
  GET_DATOS_USER,
  POST_ORDEN,
} from "../Actions/actions.js";

export function getProducts() {
  return async function (dispatch) {
    try {
      var products = await axios.get("http://localhost:3001/product");
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      console.log("no se encontraron productos");
    }
  };
}

export function postProducts() {
  return async function (dispatch) {
    try {
      var products = await axios.post("http://localhost:3001/product");
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      console.log("faltan campos por llenar");
    }
  };
}



export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var products = await axios.get(
        `http://localhost:3001/product?name=${name}`
      );
      return dispatch({
        type: GET_PRODUCTS_BY_NAME,
        payload: products.data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function getDetail(prodId) {
  return async function (dispatch) {
    try {
      var productDetail = await axios.get(
        `http://localhost:3001/product/${prodId}`,
        prodId
      );
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}



export function getCategory() {
  return async function (dispatch) {
    try {
      var category = await axios.get("http://localhost:3001/filter/category");
      return dispatch({
        type: GET_CATEGORY,
        payload: category.data,
      });
    } catch (error) {
      console.log("no se encontraron categorias");
    }
  };
}

export function getSize() {
  return async function (dispatch) {
    try {
      var size = await axios.get("http://localhost:3001/filter/talle");
      return dispatch({
        type: GET_SIZE,
        payload: size.data,
      });
    } catch (error) {
      console.log("no se encontraron talles");
    }
  };
}

export function getBrand() {
  return async function (dispatch) {
    try {
      var brand = await axios.get("http://localhost:3001/filter/marca");
      return dispatch({
        type: GET_BRAND,
        payload: brand.data,
      });
    } catch (error) {
      console.log("no se encontraron marcas");
    }
  };
}

export function getPrice() {
  return async function (dispatch) {
    try {
      var price = await axios.get("http://localhost:3001/precios");
      return dispatch({
        type: GET_PRICE,
        payload: price.data,
      });
    } catch (error) {
      console.log("no se encontraron precios");
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      var users = await axios.get("http://localhost:3001/user");
      return dispatch({
        type: GET_USERS,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const updateUser = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/user/${id}`, updatedData);
      console.log('Response from server: ', res); // Agregar este console.log
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log('Error updating user: ', err); // Agregar este console.log
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: err.response.data.message
      });
    }
  };
};


export const ingreso = (email) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post("http://localhost:3001/user/login", {
        email,
      });
      const usuario = apiData.data;
      // localStorage.setItem("token", usuario.token);
      // localStorage.setItem("loginUser", JSON.stringify(usuario));
      // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      // // const expirationDate = new Date(new Date().getTime() + 120 * 1000); // 2 minutos para pruebas
      // localStorage.setItem('expirationDate', expirationDate);
      dispatch({
        type: POST_INGRESO,
        payload: usuario,
      });
      return usuario;
    } catch (error) {}
  };
};

export const registros = (email) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post("http://localhost:3001/user/registro", {
        email,
      });
      const usuario = apiData.data;
      // localStorage.setItem("token", usuario.token);
      // localStorage.setItem("loginUser", JSON.stringify(usuario));
      // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      // // const expirationDate = new Date(new Date().getTime() + 120 * 1000); // 2 minutos para pruebas
      // localStorage.setItem('expirationDate', expirationDate);
      dispatch({
        type: POST_REGISTRO,
        payload: usuario,
      });
      return usuario;
    } catch (error) {}
  };
};

export const loginUserGoogle = (email) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post("http://localhost:3001/user/google", {
        email,
      });
      const usuario = apiData.data;
      // localStorage.setItem("token", usuario.token);
      // localStorage.setItem("loginUser", JSON.stringify(usuario));
      // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      // // const expirationDate = new Date(new Date().getTime() + 120 * 1000); // 2 minutos para pruebas
      // localStorage.setItem('expirationDate', expirationDate);
      dispatch({
        type: POST_GOOGLE,
        payload: usuario,
      });
      return usuario;
    } catch (error) {}
  };
};

export const borrarToken = () => {
  return {
    type: BORRAR_TOKEN,
    payload: {
      email: "",
      rol: "",
      token: "",
    },
  };
};

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
}

export function filterBySize(payload) {
  return {
    type: FILTER_BY_SIZE,
    payload,
  };
}

export function filterByCategory(payload) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: payload.toLowerCase(),
  };
}

export function filterByBrand(brand) {
  return async (dispatch) => {
    dispatch({
      type: FILTER_BY_BRAND,
      payload: brand,
    });
  };
}

export function orderByBestSelling(payload) {
  return {
    type: ORDER_BY_BEST_SELLING,
    payload,
  };
}

export function priceRangeSelector(payload) {
  return {
    type: PRICE_RANGE_SELECTOR,
    payload,
  };
}
export function addToCart(item, loginUserId) {
  // console.log('actions', item);
  // console.log('actions', loginUserId);
  return async function (dispatch) {
    console.log("actions", item);
    console.log("actions", loginUserId);
    try {
      var userCart = await axios.post(
        `http://localhost:3001/cart/${loginUserId}`,
        item
      );
      return dispatch({
        type: ADD_TO_CART,
        payload: userCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserCart(loginUserId) {
  return async function (dispatch) {
    try {
      var userCart = await axios.get(
        `http://localhost:3001/cart/${loginUserId}`
      );
      const userCartData = userCart.data;
      console.log(userCartData, "actions");
      return dispatch({
        type: GET_CART_BY_ID,
        payload: userCartData,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addSize(payload) {
  return {
    type: ADD_SIZE,
    payload,
  };
}

export function addQty(payload) {
  return {
    type: ADD_QUANTITY,
    payload,
  };
}

export function addFav(userId, prodId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiData = await axios.post(
        `http://localhost:3001/favorite/${userId}/${prodId}`,
        {},
        { headers }
      );
      const favorito = apiData.data;
      dispatch({
        type: ADD_FAV,
        payload: favorito,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
}

export function getFav(userId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiData = await axios.get(
        `http://localhost:3001/favorite/${userId}`,
        { headers }
      );
      const favorito = apiData.data;
      dispatch({
        type: GET_USERS_FAVORITES,
        payload: favorito,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
}

export function deletFav(userId, prodId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiData = await axios.delete(
        `http://localhost:3001/favorite/${userId}/${prodId}`,
        { headers }
      );
      const favorito = apiData.data;
      dispatch({
        type: DELETE_FAV,
        payload: favorito,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
}
export function closeSession() {
  return {
    type: CLOSE_SESSION,
    payload: [],
  };
}

export const postNewsletter = (email) => {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/newsletter", email);

      dispatch({
        type: POST_NEWSLETTER,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
};

export const getNewsletter = () => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiGet = await axios.get("http://localhost:3001/newsletter",{headers});
      const apiData = apiGet.data
      dispatch({
        type: GET_NEWSLETTER,
        payload: apiData
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
};

export const correoRegistroNewsletter = (correo) => {
  return async function(dispatch){
    try {
      await axios.post("http://localhost:3001/correo/registroNewsletter",correo)
      dispatch({
        type: REGISTRO_NEWSLETTER
      })
    } catch (error) {
      
    }
  }
}

export const mercadoPago = (item, player) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = { 
        'x-access-token': token,
      };
      console.log(item);
      const response = await axios.post(`http://localhost:3001/mp/create_preference`, {data:{ item, player }}, {headers});
      const apiData = response.data
      const initPoint = apiData.global.init_point;
      window.location.href = initPoint;
      dispatch({
        type: POST_MERCADO_PAGO,
        payload: apiData.global
      })
    } catch (error) {
      console.log(error.request.response);
    }
  }
};

export const statusMercadoPago = (compraId) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = { 
        'x-access-token': token,
      };
      const response = await axios.get(`http://localhost:3001/mp/compra/${compraId}`,{headers});
      const apiData = response.data
      console.log("accion statusMercadoPago", apiData);
      dispatch({
        type: GET_MERCADO_PAGO,
        payload: apiData
      })
    } catch (error) {
      console.log(error.request.response);
    }
  }
};

export const getDatosUser = (loginUserId) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = { 
        'x-access-token': token,
      };
      const response = await axios.get(`http://localhost:3001/user/datos/${loginUserId}`,{headers});
      const apiData = response.data
      dispatch({
        type: GET_DATOS_USER,
        payload: apiData
      })
    } catch (error) {
      console.log(error.request.response);
    }
  }
}

export const crearOrdenDeCompra = (loginUserId, orden) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = { 
        'x-access-token': token,
      };
      const datosApi = await axios.post(`http://localhost:3001/ordencompra/${loginUserId}`,{orden},{headers})
      const datos = datosApi.data;
      dispatch({
        type: POST_ORDEN,
        payload: datos
      })
    } catch (error) {
      console.log(error.request.response);
    }

  }
}