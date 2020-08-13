import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["#", "Product", "Price(was)", "Quantity", "Promotion", "Ordered By", "Total"];
const tdArray = [
  ["1", "Laptop1", "$1000", 1, "PROMO1","Munkhzorig", "$1000"],
  ["2", "Laptop2", "$200", 1, "No", "192.168.72.23", "$200"],
  ["3", "Laptop3", "$300", 1, "PROMO2", "Munkhzorig", "$300"],
];


class Vorders extends Component {

state={
  products:[],
}

componentDidMount = () =>{

  // axios
  //   .get("")
  //   .then((result) => 
    this.setState({products:tdArray});
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
                title="Order List"
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
                      {this.state.products.map((prop, key) => {
                        return (
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>
                                      {/* {
                                      (key == 0) && 
                                      <Link to={`/admin/myOrders/${prop}`}>
                                          {prop}
                                      </Link>
                                      } */}
                                      {/* {(key == 1) && <Link to={`/admin/myProducts/${prop}`}>
                                          {prop}
                                      </Link>} */}
                                      {/* {(key == 4) && <Link to={`/admin/myPromotions/${prop}`}>
                                          {prop}
                                      </Link>} */}
                                      {
                                      // (key != 0 && key != 1 && key != 4) && 
                                      <p>{prop}</p>
                                      }
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

export default Vorders;
