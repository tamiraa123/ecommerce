import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

const publicIp = require('public-ip');

// (async () => {
//     console.log(await publicIp.v4());
//     //=> '46.5.21.123'

//     console.log(await publicIp.v6());
//     //=> 'fe80::200:f8ff:fe21:67cf'
// })();
class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: ""
    }
  }
  handleLogout = () => {
    this.props.token();
  }
  componentDidMount = async () => {
    this.setState({ ip: await publicIp.v4() });
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
          <NavItem >
            IP: <b>  {this.state.ip}</b>
          </NavItem>
          <NavItem >
            Logged in: <b>  {localStorage.getItem('username')}</b>
          </NavItem>
          <NavItem onClick={this.handleLogout}>
            Log out
          </NavItem>


        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
