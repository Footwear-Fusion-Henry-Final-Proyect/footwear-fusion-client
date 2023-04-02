import React from "react";
import { NavLink } from "react-router-dom";

export default function Card({ id, title, price, image, marca }) {
 
  return (
    <div className="card">
      <img src={image} alt="" />

      <h4 className="marca">{marca.toUpperCase()}</h4>

      <NavLink to={`/product/${id}`}>
        <h5>{title}</h5>
      </NavLink>
      <h5>${Number(price).toLocaleString('de-DE')}.-</h5>
    </div>
  );
}
