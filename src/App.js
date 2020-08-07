import "./App.css"
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";


import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";


import AdminLayout from "layouts/Admin.jsx";
import SignUp from "./layouts/SignUp.jsx"
import Login from "./layouts/LoginForm";
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";
import AdminNavbar from "components/Navbars/AdminNavbar"
import history from './history';

export default class App extends Component {

    state = {
        // token : null,
        role: null,
    };

    handleLogin = (role) => {
        // console.log("handleLogin("+token+")");
        // this.setState({token});
        
        this.setState({role});
        console.log("App.js");
        console.log(role);
        if(role === "ROLE_VENDOR")
            this.router.history.push("/admin/profile");
        else
            this.router.history.push("/admin/user");
            
    };

    handleLogout = () =>{
        // localStorage.removeItem("token");
        // this.setState({ token: null });
        this.router.history.push("/");
    };
    render(){
        return(
        <Router ref={(router) => (this.router = router)} >
            <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} token={this.handleLogout} role={this.state.role}/>} />
            <Route path = "/signUp" render={()=><SignUp onLogin = {this.handleLogin}/>}/>
            <Route path = "/" 
                        render={()=><Login onLogin = {this.handleLogin} />}/>
            </Switch>
        </Router>
        );
    }
}