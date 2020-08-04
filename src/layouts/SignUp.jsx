import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
{/* <script crossorigin src="..."></script> */ }

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
    
    console.log(this.state);
  }
  handleRegisterBtn = () => {
    axios
      .post('http://10.10.14.62:8080/addVendor',
        {
          vendorname: this.state.companyName,
          email: this.state.email,
          vendorphone: this.state.vendorContactNo,
          password: this.state.password
        }
      )
      .then((result) => {
        window.location = '/';
      })
      .catch((err) =>
        this.setState({ error: "Error" })//err.response.data.error.message
      );
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
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "companyName",
                        label: "Company Name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Company Name",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "email",
                        label: "Email address",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Email address",
                        onChange: this.handleChange.bind(this)
                        // disabled: true
                      },
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "vendorContactNo",
                        label: "Phone number",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Vendor phone number",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "password",
                        label: "Password",
                        type: "password",
                        bsClass: "form-control",
                        placeholder: "Password",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "reppassword",
                        label: "Repeat password",
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
      </Grid>
    );
  }
}

export default UserProfile;
