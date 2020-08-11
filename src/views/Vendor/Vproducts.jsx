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

const thArray = ["Product ID", "Product Category", "Product Name", "Selling Price", "Manifacturer", "Quantity", "Status"];

class Vproducts extends Component {

  state = {
    token: "",
    role: "",
    userId: "",
    products: []
  }

  componentDidMount = () => {
    this.setState({ token: localStorage.getItem("token") });
    this.setState({ role: localStorage.getItem("role") });
    this.setState({ userId: localStorage.getItem("userId") });
    let url = server.urlHenok + "/products/vendor/"+localStorage.getItem("userId");
    // console.log(url);
    axios
      .get(url,{
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      })
      .then((result) => {
        // console.log("11111111111111111111111");
        console.log(result.data);
        this.setState({ products: result.data });
      })
      .catch((err) =>
        this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
      );
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Product List"
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
                      {this.state.products.map((product) => {
                        return (
                          <tr>
                            <td><Link to={`/admin/myProducts/${product.productId}`}>
                              {product.productId}</Link></td>
                            <td>{product.categoryName}</td>
                            <td>{product.productName}</td>
                            <td>{product.price}</td>
                            <td>{product.manufacturer}</td>
                            <td>{product.currentQuantity}</td>
                            <td>{product.status}</td>
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
          <Link to={`/admin/myProducts/newProduct`}>
            Add Product
          </Link>
        </Button>
      </div>
    );
  }
}

export default Vproducts;
