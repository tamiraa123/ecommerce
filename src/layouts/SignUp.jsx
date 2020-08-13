import React, { Component } from "react";
import { Grid, Row, Col, Alert, Modal } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import server from "../server.json";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      reppassword: "",
      errors: {
        email: "",
        password: "",
        reppassword: "",
      },
      show: false
    }
    this.handleHide = this.handleHide.bind(this);
  }
  handleHide() {
    window.history.back();
  }

 
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
    console.log(this.state);
  }
  handleRegisterBtn = (event) => {
    
    if (this.validate()) {
      //console.log(this.state);

      axios
        .post(server.url + "/signup",
          {
            username: this.state.email,
            password: this.state.password,
            role: "ROLE_VENDOR"
          }
        )
        .then((result) => {
          alert(result);
        })
        .catch((err) => {
          this.setState({ show: true })
          // alert(err);

        });
    }
  }
  validate() {
    let input = this.state;
    let errors = {};
    let isValid = true;

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (!input["reppassword"]) {
      isValid = false;
      errors["reppassword"] = "Please enter your confirm password.";
    }

    if (typeof input["password"] !== "undefined" && typeof input["reppassword"] !== "undefined") {

      if (input["password"] != input["reppassword"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }

    this.setState({
      errors: errors
    });
    console.log(this.state)
    return isValid;
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <Card
              title="Register as a Vendor to e-Shop"
              content={

                <form>
                  {this.state.errors.email && (
                    <Alert bsStyle="danger">
                      {this.state.errors.email}
                    </Alert>
                  )}

                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "email",
                        label: "*Email address",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Email address",
                        onChange: this.handleChange.bind(this)
                        // disabled: true
                      },
                    ]}
                  />

                  {this.state.errors.password && (
                    <Alert bsStyle="danger">
                      {this.state.errors.password}
                    </Alert>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "password",
                        label: "*Password",
                        type: "password",
                        bsClass: "form-control",
                        placeholder: "Password",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  />
                  {this.state.errors.reppassword && (
                    <Alert bsStyle="danger">
                      {this.state.errors.reppassword}
                    </Alert>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "reppassword",
                        label: "*Repeat password",
                        type: "password",
                        bsClass: "form-control",
                        placeholder: "Re-enter your password",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  />
                  <Button bsStyle="info" pullRight fill onClick={this.handleRegisterBtn}>
                    Register
                    </Button>
                  <div className="clearfix" />
                </form>
               
              }
            />
          </Col>
          <Col md={4}>
          </Col>

        </Row>
        <Modal
                  show={this.state.show}
                  onHide={this.handleHide}
                  container={this}
                  aria-labelledby="contained-modal-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                      Contained Modal
                      
   </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You are registered now. Please maintain your account information just after login.
 </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                  </Modal.Footer>
                </Modal>
                
      </Grid>
    );
  }
}

export default UserProfile;
