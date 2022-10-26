import React from "react";
import GenrePicker from "./GenrePicker";
import StockList from "./StockList";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {clearUser} from "./state/user";
import { useSelector } from "react-redux";

function TopMenu() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user);

  const goToLogin = ()=>{
    navigate("/login");
  };

  function handleSignOut(){
    localStorage.removeItem("jwt");
    dispatch(clearUser());
    goToLogin();
  };

  return (
    <nav className="menu">
      <ul className="uf">
        <li><button>
          <span className="profile-logo" role="img" aria-label="user">
            👤
          </span>
          {/* <span className="profile-menu">Hi, {user["first_name"]}</span> */}
          <span className="profile-menu">Hi, {user['profile']['first_name']}</span>
        </button><ul>
                        <li><Link to="/edit-profile">Edit Profile</Link></li>
                        <li onClick={handleSignOut}><a href="#">Log Out</a></li>
                    </ul></li>
      </ul>
    </nav>
  );
}

export default TopMenu;
