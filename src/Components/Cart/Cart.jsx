import { NavLink, useNavigate } from "react-router-dom";
import promos from "../images/promos.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, getFav, getUserCart } from "../../Redux/Actions";
import swal from "sweetalert";
import { useEffect } from "react";


export default function Cart() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item);
  const loginUserId = useSelector((state) => state.loginUser.id);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  const totalPrice = item.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  useEffect(() => {
    const getCarFav = async () => {
      await dispatch(getUserCart(loginUserId));
      await dispatch(getFav(loginUserId))
    };
    getCarFav();
  }, [dispatch]);

  const handleDeleteFromCart = async (compraProductId) => {
    if (!token) {
      swal("Error", "Logueate para continuar!", "error"); 
      return navigate("/login");
    }
    await dispatch(deleteFromCart(compraProductId));
    await dispatch(getUserCart(loginUserId));
    swal("Producto eliminado del carrito!", "success");
  };


  return (
     <div className="cart">
      <div className="cart-header">
        <div>
          <h3>CARRITO DE COMPRAS</h3>
          <p>{item.length} PRODUCTOS</p>
        </div>
        <button>TERMINAR DE COMPRAR</button>
      </div>

      {item && item.length > 0 ? (
        item.map((e) => (
          <div className="zapato" key={e.code}>
            <img src={e.image} alt="zapato" />
            <div className="zapato-datos">
              <p>
                <strong>{e.marca}</strong>
                <br />
                {e.title}
              </p>
              <span>Código del artículo: {e.code}</span>
              <p>Talle: {e.talle}</p>
              <div className="sel-cant">
                <p>
                  Cantidad <b>{e.qty}</b>
                </p>
              </div>
              <button className="eliminar" onClick={() => handleDeleteFromCart(e.compraProductId)}><small>eliminar</small></button>
            </div>
            <div className="zapato-precio">
              <h2>Precio</h2>
              <h2>${e.price.toLocaleString("de-De")}</h2>
            </div>
            
          </div>
        ))
      ) : (
        <div className="zapato">
          <h1>TODAVIA NO HAY PRODUCTOS</h1>
        </div>
      )}

      <div className="cart-footer">
        <img src={promos} alt="" />
        <div className="ahora-si">
        <h1>Total: ${totalPrice.toLocaleString("de-De")}</h1>
        <NavLink to={"/terminarCompra"}>
          <button>TERMINAR COMPRAR</button>
        </NavLink>
          <NavLink to={"/"}>
            <button className="favs">Continuar comprando...</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}