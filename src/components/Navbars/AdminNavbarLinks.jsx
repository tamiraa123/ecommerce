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
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>
          <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown>
          <NavItem onClick={this.handleLogout}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
