import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../style/Layout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faWarehouse, faBuildingNgo, faHandHoldingMedical, faHospital } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div>
      <div className="sidebar" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        <div className="menu">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                
                
                 {/* <FontAwesomeIcon icon={faBuildingNgo} size="2x" className="mx-2" /> */}
                 <FontAwesomeIcon icon={faWarehouse}  size="2x" className="mx-2"  />
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >

                <FontAwesomeIcon icon={faHandHoldingMedical} size="2x" className="mx-2"/>
                <Link to="/donar">Donar</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >

                <FontAwesomeIcon icon={faHospital} size="2x" className="mx-2" />
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
               
                <FontAwesomeIcon icon={faHandHoldingMedical} size="2x" className="mx-2"/>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >

                <FontAwesomeIcon icon={faHospital} size="2x" className="mx-2" />
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
              
                <FontAwesomeIcon icon={faBuildingNgo} size="2x" className="mx-2" />
                <Link to="/org-list">Organisation List</Link>
              </div>
            </>
          )}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/orgnaisation" && "active"
              }`}
            >
            
              
              <FontAwesomeIcon icon={faBuildingNgo} size="2x" className="mx-2" />
              <Link to="/orgnaisation">Orgnaisation</Link>
            </div>
          )}
          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
           
              
              <FontAwesomeIcon icon={faBuildingNgo} size="2x" className="mx-2" />
              <Link to="/consumer">Consumer</Link>
            </div>
          )}
          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
             
              
              <FontAwesomeIcon icon={faBuildingNgo} size="2x" className="mx-2" />
              <Link to="/donation">Donation</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
