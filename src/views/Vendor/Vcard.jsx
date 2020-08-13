import React, { Component } from "react";

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import 'filepond/dist/filepond.min.css';
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import server from "../../server.json";
import axios from "axios";

class Vcard extends Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      cvv : "",
      fullname : "",
      expDate : null,
      cnum : "",
      status : "",
      bankName : ""
    }
  }
  
  handleSavebtn= async () => {
    console.log(server.url + "/vendors/cards/"+localStorage.getItem("userId"));
    await axios
      .post(
        server.url + "/vendors/cards/"+localStorage.getItem("userId"),
        {
          cardNumber : this.state.cnum,
          holderName : this.state.fullname,
          expirationDate : this.state.expDate,
          cvv : this.state.cvv,
          cardStatus : true,
          bankName : this.state.bankName
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        },
      )
      .then((result) => {
        console.log(result)
        alert("Successful")
        this.props.history.goBack();
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        console.log(err);
      }
      );  
  }

  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="Card"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Service Provider",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Service Provider",
                          defaultValue: this.state.bankName,
                          name: "bankName",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Card Holder's Full Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Card Holder's Full Name",
                          defaultValue: this.state.fullname,
                          name: "fullname",
                          onChange: this.handleChange.bind(this)
                        }
                      ]
                      }
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Card Number",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "CNumber",
                          defaultValue: this.state.cnum,
                          name: "cnum",
                          onChange: this.handleChange.bind(this)
                        },

                       
                        {
                          label: "Expiration date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Expiration date",
                          defaultValue: this.state.expDate,
                          name: "expDate",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "CVV",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "CVV",
                          defaultValue: this.state.cvv,
                          name: "cvv",
                          disabled: false,
                          onChange: this.handleChange.bind(this)
                        },
                      ]
                      }
                    />
                    
                    <Button bsStyle="info" pullRight fill onClick={this.handleSavebtn}>
                      Add card
                    </Button>
                    {/* <div className="clearfix" /> */}
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

export default Vcard;
