import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    DropdownButton,
    MenuItem
  } from "react-bootstrap";
  import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import UserStore from "../UserStore";
import {observer} from "mobx-react";
import avatar from "assets/img/faces/face-3.jpg";

class LoginForm extends React.Component{
  state = {
    username:null,
    password:null,
    role:'admin'
  }

    doLogIn(){
      this.username = "asdfasd";
      this.password = "sadfasdf";
      this.props.onLogin("jsahdgfaksdgfa");
      console.log("LoginForm -> isLoggedIn: clicked");
    }

    render(){
        return(
            <div className="content">
            <Grid fluid>
              <Row className="justify-content-md-center">
                <Col md={5}>
                  <Card
                    title="E-Commerce Admin Panel"
                    content={
                      <form>
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              name:"username",
                              label: "User Name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "User Name",
                              defaultValue: "Mike"
                            },
                            {
                              name:"password",
                              label: "User Password",
                              type: "password",
                              bsClass: "form-control",
                              placeholder: "User Password",
                              defaultValue: "Andrew",
                            }       
                          ]}
                        />
                        <select value={this.state.role} onChange={this.handleChange}>
                          <option selected value="admin">Admin</option>
                          <option value="vendor">Vendor</option>
                        </select>
                        <Button bsStyle="info" pullRight fill type="submit" onClick={this.doLogIn()}>
                          Login
                        </Button>
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
export default observer(LoginForm);