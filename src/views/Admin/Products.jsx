import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["#", "Product Name"];
//const thArray = ["#", "Product Name", "Price", "Brand", "Quantity","Is Active"];
const tdArray = [
  ["1", "Laptop1", "$2,738", "Apple", "5","Yes"],
  ["2", "Laptop2", "$3,789", "Samsung", "10","No"],
  ["3", "Laptop3", "$6,142", "Dell", "7","Yes"],
];


class Products extends Component {

state={
  products:[{
    id:null,
    name:""
  }],
}

componentDidMount = () =>{

  this.setState({ loading: true });
    axios
      .get("http://localhost:4000/products")
      .then((result) =>
        //console.log(result.data[0].id)  
        this.setState({ loading: false, 
                    //products.id = result.data[0].id,

                    })
      )
      .catch((err) => 
          this.setState({ loading: false, error: err.response }));

    // this.setState({products:tdArray});


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
                      {this.state.products.map((prop, key) => {
                        return (
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>
                                      {(key == 0) && <Link to={`/admin/products/${prop}`}>
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

export default Products;
