import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authActions";
import ProfileImage from ".././ProfileImage";

const Header = props => {
  const { username, isLoggedIn, image } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    image: store.image
  }));
  const menuArea = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = event => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  let links = (
    <ul className="flex flex-row items-center">
      <li className="mr-[30px] text-[#fdb668] text-[20px]">
        <Link className="nav-link" to="/login">
          anasayfa
        </Link>
      </li>
      <li className="mr-[30px] text-[#fdb668] text-[20px]">
        <Link className="nav-link" to="/login">
          nedir?
        </Link>
      </li>
      <li className="mr-[30px] text-[#fdb668] text-[20px]">
        <Link className="nav-link" to="/login">
          giriş yap
        </Link>
      </li>
      <li className="text-[#016980] bg-[#fdb668] text-[20px] rounded-[100px] px-[20px] py-[6px] font-semibold">
        <Link className="nav-link" to="/signup">
          kayıt ol
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    let dropDownClass = "dropdown-menu p-0 shadow";
    if (menuVisible) {
      dropDownClass += " show";
    }
    links = (
      // <ul className="navbar-nav ml-auto" ref={menuArea}>
      <ul className="flex flex-row items-center">
        <li className="mr-[30px] text-[#fdb668] text-[20px]">
          {/* <div
            className="d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => setMenuVisible(true)}
          > */}
          {/* <Link className="nav-link dropdown-toggle" to={`/users/${username}`}>{username}</Link> */}
          {/* <span className="nav-link dropdown-toggle">{username}</span> */}
          {/* <ProfileImage image={image} width="32" height="32" className="rounded-circle m-auto" /> */}
          {/* </div> */}
          {/* <div className={dropDownClass}> */}

            <Link
              className="nav-link"
              to={`/users/${username}`}
              onClick={() => setMenuVisible(false)}
            >
              profil
            </Link>
          </li>
          <li className="mr-[30px] text-[#fdb668] text-[20px]">
            <Link
              className="nav-link"
              to={`/${username}/settings`}
              onClick={() => setMenuVisible(false)}
            >
              ayarlar
            </Link>
          </li>
          <li className="mr-[30px] text-[#fdb668] text-[20px]">
            <span
              className="nav-link"
              onClick={onLogoutSuccess}
              style={{ cursor: "pointer" }}
            >
              çıkış
            </span>
          </li>
          {/* </div> */}        
      </ul>
    );
  }

  return (
    <div className="container mx-auto py-[25px] flex justify-between">
      <Link to="/">
        <div>
          <img src="logo.png" className="h-[60px]" />
        </div>
      </Link>
      {links}
    </div>
  );
};

export default Header;
