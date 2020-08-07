import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import server from "../server.json";

{/* <script crossorigin src="..."></script> */ }

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // companyName: "",
      email: "",
      // vendorContactNo: "",
      password: "",
      reppassword: "",
      errors: {
        // companyName: "",
        email: "",
        // vendorContactNo: "",
        password: "",
        reppassword: "",

      }

    }
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value })

    console.log(this.state);
  }
  handleRegisterBtn = (event) => {
    axios
      .post(server.url+"/signup",
        {
          // vendorname: this.state.companyName,
          username: this.state.email,
          // vendorphone: this.state.vendorContactNo,
          password: this.state.password,
          role: "ROLE_VENDOR"
        }
      )
      .then((result) => {
        window.location = '/';
      })
      .catch((err) =>
        this.setState({ error: "Error" })//err.response.data.error.message
      );

    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      let input = {};
      // input["companyName"] = "";
      // input["vendorContactNo"] = "";
      
      input["email"] = "";
      input["password"] = "";
      input["reppassword"] = "";
      
      this.setState({ input: input });

      alert('Demo Form is submited');
    }
  }
  validate() {
    let input = this.state;
    let errors = {};
    let isValid = true;

    // if (!input["companyName"]) {
    //   isValid = false;
    //   errors["companyName"] = "Please enter your company name.";
    // }

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
//

// if (!input["vendorContactNo"]) {
//   isValid = false;
//   errors["vendorContactNo"] = "Please enter your phone number.";
// }

// if (typeof input["vendorContactNo"] !== "undefined") {

//   var pattern = new RegExp('((\\(\d{3}\\) ?)|(\\d{3}-))?\\d{3}-\\d{4}', 'i');
//   if (!pattern.test(input["vendorContactNo"])) {
//     isValid = false;
//     errors["vendorContactNo"] = "Please enter valid phone number.";
//   }
// }

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
                  <div className="text-danger">{this.state.errors.companyName}</div>
                  
                  {/* <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "companyName",
                        label: "*Company Name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Company Name",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  /> */}
                  <div className="text-danger">{this.state.errors.email}</div>
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
                  {/* <div className="text-danger">{this.state.errors.vendorContactNo}</div>
                  
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        name: "vendorContactNo",
                        label: "*Phone number",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Vendor phone number",
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  /> */}
                  <div className="text-danger">{this.state.errors.password}</div>
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
                  <div className="text-danger">{this.state.errors.reppassword}</div>
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
      </Grid>
    );
  }
}

export default UserProfile;
