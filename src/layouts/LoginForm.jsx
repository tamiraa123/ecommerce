import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,DropdownButton,MenuItem} from "react-bootstrap";
  import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {observer} from "mobx-react";
import "./LoginForm.css";

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:null,
      password:null,
      role:'Employee'
    };
    this.handleChange = this.handleChange.bind(this);
  }

    doLogIn(){
      this.username = "asdfasd";
      this.password = "sadfasdf";
      
      this.props.onLogin("jsahdgfaksdgfa");
      console.log("LoginForm -> isLoggedIn: clicked");
    }

    handleChange(event) {
      this.setState({role: event});
      console.log(event);
    }

    render(){
        return(
        <Grid>
         
              <Row className="show-grid">
              <Col xs={8} md={4}>
              
              </Col>
                <Col xs={4} md={4}>
                  <Card
                    title="E-Commerce Employee"
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
                        
                        
                        {/* <select className="dropdown" value={this.state.role} onChange={this.handleChange}>
                          <option selected value="admin">Admin</option>
                          <option value="vendor">Vendor</option>
                        </select> */}


                    <DropdownButton  title={this.state.role} onSelect={this.handleChange} >
                      <MenuItem  eventKey="Employee">Employee</MenuItem>
                      <MenuItem eventKey="Vendor">Vendor</MenuItem>
                    </DropdownButton>


                      <Button bsStyle="info" pullRight fill type="submit" onClick={this.doLogIn()}>
                        Login
                      </Button>
                        <div className="clearfix" />
                      </form>
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
export default observer(LoginForm);