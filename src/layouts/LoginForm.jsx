import React, { Component } from "react";
import {
  Grid,
  Row,
  Col, DropdownButton, MenuItem, Alert
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "./LoginForm.css";
import axios from "axios";
import server from "../server.json";


// const rolesD = ["Vendor", "Employee"];
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      //role: rolesD[0],
      error: null,
      loading: false,
    };
    // this.handleChangeRole = this.handleChangeRole.bind(this);
  }

  doLogIn = async () => {
    console.log("LoginForm-> doLogIn")

    if (this.state.email === "" || this.state.password === "") {
      this.setState({ error: "Please fill all required fields!" });
    } else {
     await axios
        .post(server.url + "/login", {
          username: this.state.email,
          password: this.state.password,
        })
        .then((result) => {
          //console.log(result);
          
          //if(this.state.role == "Employee") {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userId", result.data.userId);
          localStorage.setItem("role", result.data.role);//here need to set Role of Employee
          this.props.onLogin(result.data.role); //result.data[0].token,
          // } else {
          //   localStorage.setItem("role", this.state.role);
          // }
        })
        .catch((err) =>
          this.setState({ error: "Error" })//err.response.data.error.message
        );
    }
  };

  // handleChangeRole(event) {
  //   this.setState({ role: rolesD[event] });
  // }

  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: null })
  }

  render() {
    return (
      <Grid>
        <Row >
          <Col xs={8} md={4}>
          </Col>
          <Col xs={8} md={4}>
            <Card
              title="E-Commerce Employee"
              content={
                <div>
                  {this.state.error && (
                    <Alert bsStyle="danger">
                      {this.state.error}
                    </Alert>
                  )}
                  <FormInputs
                    ncols={["col-md-6", "col-md-6"]}
                    properties={[
                      {
                        name: "email",
                        label: "User Name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "User Name",
                        defaultValue: this.state.email,
                        name: "email",
                        onChange: this.handleChange.bind(this),
                      },
                      {
                        name: "password",
                        label: "User Password",
                        type: "password",
                        bsClass: "form-control",
                        placeholder: "Password",
                        defaultValue: this.state.password,
                        onChange: this.handleChange.bind(this)
                      }
                    ]}
                  />

                  {/* <DropdownButton
                    title={this.state.role}
                    id="document-type"
                    onSelect={this.handleChangeRole}
                  >
                    {rolesD.map((opt, i) => (
                      <MenuItem key={i} eventKey={i}>
                        {opt}
                      </MenuItem>
                    ))}
                  </DropdownButton> */}

                  <Button bsStyle="info" pullRight fill type="submit" onClick={this.doLogIn}>
                    Login
                  </Button>
                  <div className="clearfix" />
                </div>
              }
            />
          </Col>
          <Col xs={8} md={4}>
          </Col>
        </Row>

      </Grid>
    );
  }
}
//export default LoginForm;