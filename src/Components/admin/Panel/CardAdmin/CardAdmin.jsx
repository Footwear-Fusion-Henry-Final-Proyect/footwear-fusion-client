import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  modifyProductPrice,
  modifyProductImage,
  modifyProductStock,
} from "../../../../Redux/Actions";
import Swal from "sweetalert2";
import UploadWidget from "../../../UploadWidget/UploadWidget";

export default function CardAdmin({ id, title, price, image, marca, stock }) {
  const dispatch = useDispatch();
  const [reloadComponent, setReloadComponent] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [newStock, setNewStock] = useState(stock);
  const [showPopup, setShowPopup] = useState(false);

  function handleModifyPrice() {
    Swal.fire({
      title: "Ingrese el nuevo precio:",
      input: "text",
      inputValue: newPrice,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const inputPrice = parseFloat(result.value);
        if (isNaN(inputPrice)) {
          Swal.fire("Error", "Ingrese un valor numérico válido", "error");
        } else if (inputPrice === price) {
          Swal.fire("Advertencia", "El precio es el mismo", "warning");
        } else {
          dispatch(modifyProductPrice(id, inputPrice)).then(() => {
            setNewPrice(inputPrice);
            Swal.fire(
              "Precio modificado",
              `El precio ha sido actualizado a $${inputPrice.toLocaleString(
                "de-DE"
              )}.-`,
              "success"
            );
          });
        }
      }
    });
  }



  function handleModifyImage(url) {
    setProdImage({ ...prodImage, imagen: url });
    dispatch(modifyProductImage(id, prodImage.image))
  }




  function handleModifyStock() {
    Swal.fire({
      title: "Ingrese el stock disponible:",
      input: "text",
      inputValue: newStock,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const inputStock = parseFloat(result.value);
        if (isNaN(inputStock)) {
          Swal.fire("Error", "Ingrese un valor numérico válido", "error");
        } else if (inputStock === price) {
          Swal.fire("Advertencia", "El precio es el mismo", "warning");
        } else {
          dispatch(modifyProductStock(id, inputStock)).then(() => {
            setNewStock(inputStock);
            Swal.fire(
              "Stock modificado",
              `El stock ha sido actualizado a ${inputStock} unidades`,
              "success"
            );
          });
        }
      }
    });
  }

  const [prodImage, setProdImage] = useState({
    image: "",
  });


  return (
    <div key={reloadComponent ? "reload" : ""} className="card admin-card">
      <button onClick={() => setShowPopup(true)}>
        <img src={image} alt="" />
      </button>
      <h4 className="marca">{marca.toUpperCase()}</h4>
      <h5>{title}</h5>
      <button onClick={handleModifyPrice}>
        <h5>${Number(newPrice).toLocaleString("de-DE")}.- </h5>
      </button>
      <button onClick={handleModifyStock}>
        <h5>Stock: {newStock}</h5>
      </button>
      {showPopup && (
        <div className="popup prod-popup image-popup">
         
          <UploadWidget onUpload={handleModifyImage} />
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
