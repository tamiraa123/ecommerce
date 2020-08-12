import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import { Link } from "react-router-dom";
import axios from "axios";
import server from "../../server.json";
const thArray = ["Promotion Number", "Promotion Name", "Discount","From","To", "Product"];

class Products extends Component {

state={
  promos:[],
}

componentDidMount = async () => {
  console.log(server.url + "/promotions");
  this.setState({ loading: true });
  await axios
    .get(server.url + "/promotions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((result) => {
      console.log(result.data);
      this.setState({ promos: result.data })
      this.setState({ loading: false })
      }
    )
    .catch((err) => this.setState({ loading: false, error: err.response }));
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
                      {this.state.promos.map(card => {
                        return (
                          <tr>
                            <td><Link to={`/admin/myPromotions/${card.id}`}>
                              {card.id}</Link></td>
                            <td>{card.promoName}</td>
                            <td>{card.promotionPercentage}</td>
                            <td>{card.startDate}</td>
                            <td>{card.endDate}</td>
                            <td><Link to={`/admin/myProducts/${card.productId}`}>
                              {card.productId}</Link></td>
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
          <Link to={`/admin/myPromotions/new`}>
            Add Promotion 
          </Link>
        </Button>

      </div>
    );
  }
}

export default Products;
