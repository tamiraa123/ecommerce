import React, { Component } from "react";
import { Navbar } from "react-bootstrap";


import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import Login from "./layouts/LoginForm";
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";
import AdminNavbar from "components/Navbars/AdminNavbar"

export default class App extends Component {

    state = {
        token : null,
    };

    handleLogin = (token) => {
        this.setState({token});
        localStorage.setItem("token", token);
        // this.router.history.push("/admin");
    };

    handleLogout = () =>{
        localStorage.removeItem("token");
        this.state.token = null;
        //this.router.history.push("/");
        this.props.history.push("/");
    };
    

    render(){
        return(
        <Router ref={(router) => (this.router = router)}>
            <Switch>
            
            <Route path="/admin" render={props => <AdminLayout {...props} token={this.handleLogout}/>} />
            
            <Route path = "/" render={()=><Login onLogin = {this.handleLogin} />}/>

            {/* <Route path = "/admin" component={AdminLayout}/> */}
            {/* <Redirect from  ="/" to="/admin/dashboard" /> */}
            </Switch>
        </Router>
        );
    }
}