import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import server from "../../server.json";
import axios from "axios";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import index from "Spinner";
const onAction = (node, action) => {
  console.log('onAction::', action, node)
}
let cardList = [{ label: "Nothing", value: "0", children: [] }];
const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      label: "",
      index: index,
      status : "",
      isActive: "",
    }
  }
  onChangeCard(currentNode, selectedNodes) {
    console.log('onChange::', currentNode, selectedNodes)
    this.setState({ index: selectedNodes[0].value, label: selectedNodes[0].label}, () => console.log(this.state))
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }
  componentDidMount = async () => {
    this.setState({isActive : false})
    await axios
      .get(server.url + "/vendors/" + localStorage.getItem("userId"), {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      }
      )
      .then((result) => {
        console.log(result.data.cards);
        if (result.data.cards && result.data.cards.length > 0) {
          this.setState({ cards: result.data.cards, isActive : true });
          let size = result.data.cards.length;
          cardList = [];
          for (let i = 0; i < size; i++) {
            cardList.push({ value: i, label: result.data.cards[i].cardNumber + " Discovery", children: [] });
          }
        }
        else{
          this.setState({status: "Please add at least one payment card"});
        }
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
                title="Dear Vendor,"
                content={
                  <form>
                    <blockquote>
                      <p>
                        <div className="text-danger">After one-time payment done, you will be able to use our web site with full functionality. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nulla! Voluptates saepe praesentium explicabo, tempore, quae consequuntur, totam quasi nemo corrupti illo ducimus nam nulla debitis consequatur? Rem, animi repellendus!</div>
                      </p>
                      <small>
                        "e-Shop team"
                       </small>
                    </blockquote>
                    <Button
                     disabled={this.state.status?true:false}
                    bsStyle="info" 
                    pullRight fill 
                    type="submit">
                      Pay now
                    </Button>
                    <div className="text-danger">{this.state.status}</div>
                    <DropdownTreeSelect
                      disabled={this.state.status?true:false}//{this.state.isActive}
                      mode="simpleSelect"
                      texts={{ placeholder: this.state.label }}
                      data={cardList}
                      onChange={this.onChangeCard.bind(this)}
                      onAction={onAction}
                      onNodeToggle={onNodeToggle}
                    />
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default Profile;
