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

const thArray = ["Card Number", "Card Holder", "status", "cvv", "Expiration Date"];

class Vcards extends Component {

  state = {
    cards: []
  }

  componentDidMount = () => {
    axios
      .get(server.url + "/vendors/5f2d88cb9fc1544dbd0df91a", {
        headers: {
          'Authorization': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlZWdpaUBnbWFpbC5jb20iLCJpYXQiOjE1OTY4NDU0NDgsImV4cCI6MTU5NjkzMTg0OH0._iJFR5bxruD7X17aiLeW-fz3sTaqcpAsBmNiwRf3zChunmTapHqniBrLQPvEOxYipg6l8-inbHy0PjyYXOUZzg"
        }
      }
      )
      .then((result) => {
        console.log(result.data.cards);
        this.setState({cards : result.data.cards});
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
                      {this.state.cards.map(card => {
                            return (
                              <tr>
                                <td><Link to={`/admin/myCards/${card.cardNumber}`}>
                                  {card.cardNumber}</Link></td>
                                <td>{card.holderName}</td>
                                <td>{card.cardStatus}</td>
                                <td>{card.cvv}</td>
                                <td>{card.expirationDate}</td>
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
          <Link to={`/admin/myCards/0`}>
            Add a Card
          </Link>
        </Button>

      </div>
    );
  }
}

export default Vcards;
