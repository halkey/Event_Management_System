import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";
import './CSS/App.css';
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";




function App() {

  return (

      <BrowserRouter>

          <div className="page-links">
              <Link className="navigation-link" to = "/admin-page">Admin Page</Link>
              <Link className="navigation-link" to = "/login-page">Login Page</Link>
              <Link className="navigation-link" to = "/user-page">User Page</Link>
          </div>

          <div className="application-container">
              <Route path="/login-page" exact={false} component={LoginPage}/>
              <Route path="/admin-page" exact={false} component={AdminPage}/>
              <Route path="/user-page" exact={false} component={UserPage}/>
          </div>



      </BrowserRouter>

  );

}

export default App;
