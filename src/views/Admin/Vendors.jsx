import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["ID", "Email" ,"Vendor Name", "Status"];
const tdArray = [
  ["1", "abc@gmail.com",  "Niger", "New"],
  ["2", "def@gmail.com", "Curaçao", "Active"],
  ["3", "ghl@gmail.com", "Netherlands", "Blocked"],
  ["4", "klm@gmail.com",  "Korea, South", "Active"],
];


class Vendors extends Component {

state={
  verndors:[],
}

componentDidMount = () =>{

  // axios
  //   .get("")
  //   .then((result) => 
    this.setState({verndors:tdArray});
  //)
  //   .catch((err) => console.log(err.response));

}

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Customers List"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.verndors.map((prop, key) => {
                        return (
                         
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>
                                      {(key == 0) && <Link to={`/admin/vendors/${prop}`}>
                                          {prop}
                                      </Link>}
                                      {(key != 0) && <p>{prop}</p>}
                                  </td>;
                              })}
                            </tr>
                         
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>


          </Row>
        </Grid>
        <Button>
          <Link to={`/admin/vendors/0`}>
            Add Vendor 
          </Link>
        </Button>

      </div>
    );
  }
}

export default Vendors;
