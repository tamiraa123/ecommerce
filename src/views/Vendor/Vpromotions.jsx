import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["Promotion Number", "Promotion Name", "Discount", "Product", "From", "To","Is Active"];
const tdArray = [
  ["1", "Thanks Giving week", "20%", "1","2020-11-12","2020-11-19","No"],
  ["2", "Black Friday", , "50%", "1","2020-12-05","2020-12-05","Yes"],
  ["3", "Independent day", , "10%", "1","2020-07-08","2020-07-19","Yes"],
];


class Products extends Component {

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
                title="Promotion List"
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
                                      {/* {(key == 0) && <Link to={`/admin/myPromotions/${prop}`}>  */}
                                      {(key == 0) && <Link to={`/admin/myPromotions/1`}> 
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
          <Link to={`/admin/myPromotions/0`}>
            Add Promotion 
          </Link>
        </Button>

      </div>
    );
  }
}

export default Products;
