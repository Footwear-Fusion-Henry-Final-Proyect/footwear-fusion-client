import { NavLink } from "react-router-dom";
import promos from "../images/promos.jpg";
import { useSelector } from "react-redux";

export default function Cart() {
<<<<<<< HEAD
=======
  const item = useSelector((state) => state.item);
  console.log("a ver este otro ", item);

  const totalPrice = item.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

>>>>>>> d98baeba9f122a7b800f854304fe6b727aad09d7
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
          <div className="zapato">
            <img src={e.image} alt="zapato" />
            <div className="zapato-datos">
              <p>
                <strong>{e.marca}</strong>
                <br />
                {e.title}
              </p>
              <span>Código del artículo: {e.code}</span>
              <p>Talle: {e.size}</p>
              <div className="sel-cant">
                <p>
                  Cantidad <b>{e.qty}</b>
                </p>
              </div>
            </div>
            <div className="zapato-precio">
              <h2>Precio</h2>
              <h2>${e.price}</h2>
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
<<<<<<< HEAD
          <span>Subtotal: $6.500</span>
          <h1>Total $6.500</h1>
=======
          <span>Subtotal: </span>
          <h1>${totalPrice.toFixed(2)}</h1>
>>>>>>> d98baeba9f122a7b800f854304fe6b727aad09d7
          <button>COMPRAR</button>
          <NavLink to={"/"}>
            <button className="favs">Continuar comprando...</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
