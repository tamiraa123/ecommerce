import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner";
import server from "../../server.json";

//Example data
const thArray = ["#","Category" ,"Product Name", "Price", "Brand", "Quantity","Is Active"];



class Products extends Component {

state={
  products:[],
  error: null,
  loading: false,
}

componentDidMount = async () =>{

  this.setState({ loading: true });
  await axios
    .get(server.urlHenok + "/products")
    .then((result) => {
      console.log(result.data);
      this.setState({ products: result.data })
      this.setState({ loading: false })
    }
    )
    .catch((err) => this.setState({ loading: false, error: err.response }));
          
     
     //Setting example data
     // this.setState({products:tdArray});
}

  render() {
    return (
      <div className="content">
         {this.state.loading ? (
          <Spinner />
        ) : (
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Product List"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                   <Table striped hover>
                     <thead>
                       <tr>
                         {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                     <tbody>
                       {this.state.products.map(product => {
                        return (
                            <tr>
                              <td><Link to={`/admin/products/${product.productId}`}>{product.productId}</Link></td>
                              <td>{ product.categoryName }</td>
                              <td>{ product.name }</td>
                              <td>{ product.price }</td>
                              <td>{ product.brand }</td>
                              <td>{ product.quantity }</td>
                              <td>{ product.isActive ? "true" : "false" }</td>
                            </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>)}
      </div>
    );
  }
}

export default Products;
