import userIcon from "../../images/user-icon.png";
import userIconBlock from "../../images/user-icon-block.png";
import userIconAdmin from "../../images/user-icon-admin.png";


import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Actions";
import { useEffect } from "react";

export default function UserManage() {
  const usuarios = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="admin-content">
      <h1>USUARIOS</h1>
      <div className="content-prod account">
        {usuarios?.map((u) => (
          <> 
            {u.rol.toLowerCase() === "admin" ? (
              <img src={userIconAdmin} alt="user icon" />
            ) : u.rol.toLowerCase() === "customer" ? (
              <img src={userIcon} alt="user icon" />
            ) : (
              <img src={userIconBlock} alt="user icon" />
            )}
            <>
              <h5>{u.email}</h5>
              <p className={`${u.rol.toLowerCase() === "block" ? "rol-block" : ""}`} >{u.rol}</p>
            </>
            <br /><br />
          </>
        ))}
      </div>
    </div>
  );
}