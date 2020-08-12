import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  Button
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import { Link } from "react-router-dom";
import server from "../../server.json";
import axios from "axios";
const thArray = ["#", "Card Number", "Card Holder", "status", "Expiration Date", "cvv", ""];

class Vcards extends Component {

  state = {
    cards: []
  }

  componentDidMount = () => {
    axios
      .get(server.url + "/vendors/" + localStorage.getItem("userId"), {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      }
      )
      .then((result) => {
        console.log(result.data.cards);
        if (result.data.cards)
          this.setState({ cards: result.data.cards });
      })
      .catch((err) =>
        this.setState({ error: "Error" })//err.response.data.error.message
      );
  }
  handleRemoveSpecificRow = async (idx) => {
    console.log(server.url + "/vendors/"+localStorage.getItem("userId")+"/removedcard");
    await axios
      .patch(
        server.url + "/vendors/"+localStorage.getItem("userId")+"/removedcard",
        this.state.cards[idx],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        },
      )
      .then((result) => {
        console.log(result)
        alert("Card has been deleted")
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        console.log(err);
      }
      );  
      // const cards = [...this.state.cards]
          // cards.splice(idx, 1)
    
    // this.setState({ cards })
  }

foo(idx){
  console.log(idx)
}
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Card List"
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
                  {this.state.cards.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td style={{width:"20%"}}>
                        {this.state.cards[idx].cardNumber}
                        
                      </td>
                      <td>
                        {this.state.cards[idx].holderName}
                      </td>
                      <td>
                        {this.state.cards[idx].cardStatus}
                      </td>
                      <td>
                        {this.state.cards[idx].expirationDate}
                      </td>
                      <td>
                        {this.state.cards[idx].cvv}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          // onClick= {(idx)=>{handleRemoveSpecificRow(idx)}}
                        onClick= {()=>{this.handleRemoveSpecificRow(idx)}}
                        
                        >
                          Remove
                        </button>
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
        <Button>
          <Link to={`/admin/myCards/new`}>
            Add a Card
          </Link>
        </Button>

      </div>
    );
  }
}

export default Vcards;
