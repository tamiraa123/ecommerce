import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          
          <p className="copyright pull-right">
            
            July, {new Date().getFullYear()}{" "} 
            Team #3 - Project Management Course -
            <a href="./">
              &nbsp; Maharishi International University 2020 
            </a>
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
