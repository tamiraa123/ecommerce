import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["ID", "Email", "First Name", "LastName","isActive"];
const tdArray = [
  ["1", "Dakota Rice", "$36,738", "Niger", "Active"],
  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Not Active"],
  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Active"],
  ["4", "Philip Chaney", "$38,735", "Korea, South", "Active"],
  ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten"],
  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
];


class Customers extends Component {

state={
  customers:[],
}

componentDidMount = () =>{

  // axios
  //   .get("")
  //   .then((result) => 
    this.setState({customers:tdArray});
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
                      {this.state.customers.map((prop, key) => {
                        return (
                         
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>
                                      {(key == 0) && <Link to={`/admin/customers/${prop}`}>
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
          <Link to={`/admin/customers/0`}>
            Add Customer 
          </Link>
        </Button>

      </div>
    );
  }
}

export default Customers;
