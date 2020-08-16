import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  Button
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import server from "../../server.json";

const thArray = ["#", "Date", "Product", "Sold Price", "Quantity", "Ordered By"];


class Vorders extends Component {

  state = {
    products: [],
  }

  componentDidMount = () => {
    axios
      .get(server.url + "/vendors/orderitems/"+localStorage.getItem("userId")
        , {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then((result) => {
        console.log(result.data.cards);
        if (result.data)
          this.setState({ products: result.data });
      })
      .catch((err) =>
        this.setState({ error: "Error" })//err.response.data.error.message
      );
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
                      {this.state.products.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx + 1}</td>
                          <td style={{ width: "20%" }}>
                            {this.state.products[idx].orderDate}
                          </td>
                          <td><Link to={`/admin/myProducts/${this.state.products[idx].productId}`}>
                            {this.state.products[idx].productId}</Link></td>
                          <td>
                            {this.state.products[idx].price}
                          </td>
                          <td>
                            {this.state.products[idx].quantity}
                          </td>
                          <td>
                            {this.state.products[idx].userName}
                          </td>
                        </tr>
                      ))}
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
