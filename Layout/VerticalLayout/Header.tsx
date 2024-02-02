import React from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../../components/common/TopbarDropdown/NotificationDropdown";

//i18n
import { withTranslation } from "react-i18next";

//import images
import logoSm from "../../assets/images/logo-dark.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-dark.png";
import ProfileMenu from "../../components/common/TopbarDropdown/ProfileMenu";

const Header = (props:any) => {
  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="logo-sm-dark" height="50" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="logo-dark" height="100" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="logo-sm-light" height="50" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="logo-light" height="100" />
                </span>
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 waves-effect"
              id="vertical-menu-btn"
              onClick={() => {
                tToggle();
              }} >
              <i className="ri-menu-2-line align-middle"></i>
            </button>
          </div>
          <div className="d-flex">
          

            <NotificationDropdown />
            <ProfileMenu />
          
          </div>
        </div>
        
      </header>
    </React.Fragment>
  );
};

export default (withTranslation()(Header));
