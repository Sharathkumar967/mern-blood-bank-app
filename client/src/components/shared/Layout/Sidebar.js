// import React from "react";
// // import { userMenu } from "./Menus/userMenu";p
// import { useLocation, Link } from "react-router-dom";
// import "../../../styles/Layout.css";
// import { useSelector } from "react-redux";

// const Sidebar = () => {
//   const { user } = useSelector((state) => state.auth);
//   console.log("useruseruserSidebar", user?.user);

//   const location = useLocation();
//   return (
//     <div>
//       <div className="sidebar">
//         <div className="menu">
//           {user?.user?.role === "organization" && (
//             <>
//               <div
//                 className={`menu-item ${location.pathname === "/" && "active"}`}
//               >
//                 <i className="fa-solid fa-warehouse">
//                   <Link to="/">Inventory</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {user?.user?.role === "admin" && (
//             <>
//               <div
//                 className={`menu-item ${location.pathname === "/" && "active"}`}
//               >
//                 <i className="fa-solid fa-warehouse">
//                   <Link to="/">Inventory</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {user?.user?.role === "donar" && (
//             <>
//               <div
//                 className={`menu-item ${
//                   location.pathname === "/donar" && "active"
//                 }`}
//               >
//                 <i className="fa-solid fa-hand-holding-medical">
//                   <Link to="/donar">Donar</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {user?.user?.role === "hospital" && (
//             <>
//               <div
//                 className={`menu-item ${
//                   location.pathname === "/Hospital" && "active"
//                 }`}
//               >
//                 <i className="fa-solid fa-hospital">
//                   <Link to="/Hospital">Hospital</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {user?.user?.role === "donar" && (
//             <>
//               <div
//                 className={`menu-item ${
//                   location.pathname === "/donation" && "active"
//                 }`}
//               >
//                 <i className="fa-solid fa-hospital">
//                   <Link to="/donation">Dontation</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {(user?.user?.role === "donar" ||
//             user?.user?.role === "hospital") && (
//             <>
//               <div
//                 className={`menu-item ${
//                   location.pathname === "/organization" && "active"
//                 }`}
//               >
//                 <i className="fa-sharp fa-solid fa-building-ngo">
//                   <Link to="/organization">Organization</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {user?.user?.role === "consumer" && (
//             <>
//               <div
//                 className={`menu-item ${
//                   location.pathname === "/organization" && "active"
//                 }`}
//               >
//                 <i className="fa-sharp fa-solid fa-building-ngo">
//                   <Link to="/consumer">Consumer</Link>
//                 </i>
//               </div>
//             </>
//           )}

//           {/* {userMenu.map((menu) => {
//             const isActive = location.pathname === menu.path;

//             return (
//               <div
//                 className={`menu-item ${isActive && "active "}`}
//                 key={menu.name}
//               >
//                 <i className={menu.icon}></i>
//                 <Link to={menu.path}>{menu.name}</Link>
//               </div>
//             );
//           })} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.user?.role === "Organization" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}

          {user?.user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organization List</Link>
              </div>
            </>
          )}

          {(user?.user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/organization" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/organization">Orgnaisation</Link>
            </div>
          )}
          {user?.user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}
          {user?.user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}

          {/* {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
