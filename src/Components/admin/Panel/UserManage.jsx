import userIcon from "../../images/user-icon.png";
import userIconBlock from "../../images/user-icon-block.png";
import userIconAdmin from "../../images/user-icon-admin.png";
import { useDispatch, useSelector } from "react-redux";
import { createUserAdmin, getUsers, putRolUser } from "../../../Redux/Actions";
import { useEffect, useState } from "react";
import ExportExcel from "react-export-excel";
import UserPaginate from "./UserPaginate";
import Swal from "sweetalert2";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelFile.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelFile.ExcelColumn;

export default function UserManage() {
  const usuarios = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [showPopup, setShowPopup] = useState(false);

  const [adminData, setAdminData] = useState({
    name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    rol: "",
  });

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setAdminData({ ...adminData, [property]: value });
  };

  const submitHandler = () => {
    // e.preventDefault()
    dispatch(createUserAdmin(adminData));
    setAdminData({
      name: "",
      last_name: "",
      address: "",
      phone: "",
      email: "",
      rol: "",
    });
    setShowPopup(false);
    Swal.fire({
      title: "Administrador creado",
      text: "Has creado un nuevo administrador.",
      timer: 3000,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const prodPerPage = 2;
  const indexLastProd = currentPage * prodPerPage;
  const indexFirstProd = indexLastProd - prodPerPage;
  let currentUser = usuarios;
  currentUser = currentUser.slice(indexFirstProd, indexLastProd);

  const [modifRol, setModifRol] = useState({});

  const [userRol, setUserRol] = useState({
    id: "",
    rol: "",
  });

  const modificarRol = (id) => {
    setModifRol((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const rol = userRol.rol;
  const guardarRol = async (id) => {
    await dispatch(putRolUser(id, rol));
    await dispatch(getUsers());
    setModifRol((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const cambiarRol = (evento) => {
    setUserRol((prevState) => ({
      ...prevState,
      rol: evento.target.value,
    }));
  };

  return (
    <div className="admin-content">
      <h1>USUARIOS</h1>
      <button onClick={() => setShowPopup(true)}>(+) AGREGAR ADMINISTRADOR</button>
      <UserPaginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {currentUser && (
        <ExcelFile
          element={<button>Exportar a Excel</button>}
          filename="Usuarios"
        >
          <ExcelSheet data={usuarios} name="Productos">
            <ExcelColumn label="email" value={(col) => col.email} />
            <ExcelColumn label="name" value={(col) => col.DataUsers?.[0]?.name} />
            <ExcelColumn label="last name" value={(col) => col.DataUsers?.[0]?.last_name} />
            <ExcelColumn label="address" value={(col) => col.DataUsers?.[0]?.address} />
            <ExcelColumn label="phone" value={(col) => col.DataUsers?.[0]?.phone} />
            <ExcelColumn label="rol" value={(col) => col.rol} />
            <ExcelColumn label="state" value={(col) => col.state} />
          </ExcelSheet>
        </ExcelFile>
      )}
      <div className="content-prod account">
        {currentUser?.map((u) => (
          <div key={u._id}>
            {u.rol.toLowerCase() === "admin" ? (
              <img src={userIconAdmin} alt="user icon" />
            ) : u.rol.toLowerCase() === "customer" ? (
              <img src={userIcon} alt="user icon" />
            ) : (
              <img src={userIconBlock} alt="user icon" />
            )}
            <>
              <h5>{u.DataUsers?.map((d, index) => (
                <div key={index}>
                  <h3>{d.name} &nbsp; {d.last_name}</h3>
                  <h5>{d.address}</h5>
                  <h5>{d.phone}</h5>
                </div>
              ))}</h5>
              <h5>{u.email}</h5>
              <h5>{u.rol}</h5>
              <p className={`${u.state === "Blocked" ? "rol-block" : ""}`} >{u.state}</p>
            </>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup prod-popup" >
          {/* <form onSubmit={(e) => submitHandler(e)}> */}
          <h1>CREÁ NUEVO ADMINISTRADOR</h1>
          <input type="text" value={adminData.name} onChange={changeHandler} name='name' placeholder="Nombre" />
          <input type="text" value={adminData.last_name} onChange={changeHandler} name='last_name' placeholder="Apellido" />
          <input type="text" value={adminData.address} onChange={changeHandler} name='address' placeholder="Domicilio" />
          <input type="text" value={adminData.phone} onChange={changeHandler} name='phone' placeholder="Teléfono (solo numeros)" />
          <input type="text" value={adminData.email} onChange={changeHandler} name='email' placeholder="Email" />
          <input type="text" value={adminData.rol} onChange={changeHandler} name='rol' placeholder="Rol" />
          <button onClick={() => submitHandler()}>Crear Administrador</button>
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
          {/* </form> */}
        </div>
      )}
    </div>
  );
}
