import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

import image from "assets/img/sidebar-3.jpg";

import Employee from "../views/Admin/Employee";
import Product from "../views/Admin/Product";
import vProduct from "../views/Vendor/Vproduct";
import Payment from "../views/Admin/Payment";

import Customer from "../views/Admin/Customer";
import Vendor from "../views/Admin/Vendor";
import Requirement from "../views/Admin/Requirement";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    // this.state._notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
    //       every web developer.
    //     </div>
    //   ),
    //   level: level,
    //   position: position,
    //   autoDismiss: 15
    // });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" && prop.type ==="vendor") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      console.log(routes.length)
      
      if (this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };


   componentDidMount() {
    //signin
  //   try{
  //     // let res = await fetch('/isLoggedIn',{
  //     //   method: 'post',
  //     //   headers: {
  //     //     'Accept' : 'application/json',
  //     //     'Content-Type' : 'application/json'
  //     //   }
  //     // });
  //     // let result = await res.json();
  //     // if(result && result.success){
  //     //   UserStore.loading = false;
  //     //   UserStore.isLoggedIn = true;
  //     //   UserStore.username = result.username;
  //     // }
  //     // else{
  //     //   UserStore.loading = false;
  //     //   UserStore.isLoggedIn = false;
  //     // }
  // //tur nemev ustgah  sign in endee duudna
  //     UserStore.loading = false;
  //     UserStore.isLoggedIn = true;
  //     console.log("Admin->isLoggedIn:" + UserStore.isLoggedIn);
  // }
  // catch(e){
  //   UserStore.loading = false;
  //   UserStore.isLoggedIn = false;
  // }
  //signin

    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
    //       every web developer.
    //     </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
  }



  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  handleLogout = () => {
    console.log("Logged Out");
}

  render() {
        return (
          <div className="wrapper">
              {/* <NotificationSystem ref="notificationSystem" style={style} /> */}
              <Sidebar {...this.props} routes={routes} image={this.state.image}
              color={this.state.color}
              hasImage={this.state.hasImage}/>
              <div id="main-panel" className="main-panel" ref="mainPanel">
                <AdminNavbar
                  {...this.props} 
                  brandText={this.getBrandText(this.props.location.pathname)}
                />
                <Switch>
                  <Route path="/admin/employees/:id" component={Employee}></Route>
                  <Route path="/admin/products/:id" component={Product}></Route>
                  <Route path="/admin/vproducts/:id" component={vProduct}></Route>
                  <Route path="/admin/payments/:id" component={Payment}></Route>
                  <Route path="/admin/customers/:id" component={Customer}></Route>
                  <Route path="/admin/vendors/:id" component={Vendor}></Route>
                  <Route path="/admin/requirements/:id" component={Requirement}></Route>
                  {this.getRoutes(routes)}
                  
                </Switch>
                
                <Footer />
          </div>
        </div>
        );
      
}

}

export default Admin;
