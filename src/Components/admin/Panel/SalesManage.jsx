import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdenesCompra } from "../../../Redux/Actions";

export default function SalesManage(){
  const dispatch = useDispatch();
  //const ventasProductos = useSelector((state) => state.ordenesCompra);
  const user = useSelector((state) => state.loginUser);
  const userId = user.id;
  const allVentas = useSelector((state) => state.allOrdenesCompras)

  useEffect(() => {
    const orden = async () => {
      await dispatch(getAllOrdenesCompra());
    };
    orden();
  }, [dispatch]);


  return(
    <div className="admin-content">
      <h1>VENTAS</h1>
      
    </div>
  );
}