import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["#","Category" ,"Product Name", "Price", "Brand", "Quantity","Is Active"];


const tdArray = [
  {
    "id": 12,
    "name": "Apple 1",
    "description": "this is apple",
    "price": 1000,
    "brand": "Apple",
    "quantity": "3",
    "images": [
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      },
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      },
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      }
    ],
    "isActive": false,
    "productDetails": [
      {
        "specName": "CPU",
        "specValue": "1.5Ghz"
      },
      {
        "specName": "Hard",
        "specValue": "SSD 500GB"
      }
    ],
    "category": "Electronic"
  },
  {
    "id": 13,
    "name": "Apple 1",
    "description": "this is apple",
    "price": 1000,
    "brand": "Apple",
    "quantity": "3",
    "images": [
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      },
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      },
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      }
    ],
    "isActive": false,
    "productDetails": [
      {
        "specName": "CPU",
        "specValue": "1.5Ghz"
      },
      {
        "specName": "Hard",
        "specValue": "SSD 500GB"
      }
    ],
    "category": "Electronic"
  },
  {
    "id": 15,
    "name": "Apple 1",
    "description": "this is apple",
    "price": 1000,
    "brand": "Apple",
    "quantity": "3",
    "images": [
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      },
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      },
      {
        "url": "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"
      }
    ],
    "isActive": false,
    "productDetails": [
      {
        "specName": "CPU",
        "specValue": "1.5Ghz"
      },
      {
        "specName": "Hard",
        "specValue": "SSD 500GB"
      }
    ],
    "category": "Electronic"
  }
];


class Products extends Component {

state={
  products:[]
}

componentDidMount = () =>{

  // this.setState({ loading: true });
  //   axios
  //     .get("http://localhost:4000/products")
  //     .then((result) =>{
       
  //       console.log("hello") 
  //       this.setState({ products : result.data })
  //       this.setState({ loading: false})
        
  //     }
  //     )
  //     .catch((err) => this.setState({ loading: false, error: err.response }));
          
     
     
      this.setState({products:tdArray});
     

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
                              <td><Link to={`/admin/products/${product.id}`}>{product.id}</Link></td>
                              <td>{ product.category }</td>
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
        </Grid>
      </div>
    );
  }
}

export default Products;
