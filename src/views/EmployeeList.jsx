/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["ID", "Name", "Salary", "Country", "City","Position"];
const tdArray = [
  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout","Head Manager"],
  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas","Software Developer"],
  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux","Delivery man"],
  ["4", "Philip Chaney", "$38,735", "Korea, South", "Overland Park","Driver"],
  ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten","Driver"],
  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester","Director"]
];


class EmployeeList extends Component {

state={
  employees:[],
}

componentDidMount = () =>{

  // axios
  //   .get("")
  //   .then((result) => 
    this.setState({employees:tdArray});
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
                title="Employee List"
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
                      {this.state.employees.map((prop, key) => {
                        return (
                         
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>
                                      {(key == 0) && <Link to={`/admin/employees/${prop}`}>
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
      </div>
    );
  }
}

export default EmployeeList;
