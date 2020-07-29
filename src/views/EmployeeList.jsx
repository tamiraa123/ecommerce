import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["ID", "Email", "First Name", "LastName", "Role","Status"];
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
        <Button>
          <Link to={`/admin/employees/0`}>
            Add Employee 
          </Link>
        </Button>

      </div>
    );
  }
}

export default EmployeeList;
