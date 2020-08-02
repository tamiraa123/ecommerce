import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
  }
  handleLogout = () => {
    this.props.token();
}

  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        
        <Nav pullRight>
          <NavItem onClick={this.handleLogout}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
