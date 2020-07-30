/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,Label,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  constructor(props){
    super(props);
    
    this.state={
      id:0,
      image:"https://specials-images.forbesimg.com/imageserve/5d3d7a55f1176b000897d627/960x0.jpg?fit=scale",
      email:"",
      status:"", //active fired drop
      firstname:"",
      lastname:"",
      phone:"",
      street:"",
      city:"",
      state:"",
      zip:"",
      role:""//admin, engineer  drop
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "First Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First Name",
                          defaultValue: this.state.firstname,
                          name:"firstname",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          label: "Last Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last Name",
                          defaultValue: this.state.lastname,
                          name:"lastname",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          name:"image",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Phone number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Phone Number",
                          defaultValue: this.state.phone,
                          name:"phone",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Street",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Street",
                          defaultValue: this.state.street,
                          name:"street",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: this.state.city,
                          name:"city",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: this.state.state,
                          name:"state",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          defaultValue: this.state.zip,
                          name:"zip",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />

                    
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage={"https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"}
                avatar={this.state.image}
                description={
                  <span>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Image URL",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: this.state.image,
                          name:"image",
                          onChange:this.handleChange.bind(this) 
                        },
                       
                      ]}
                    />

                  </span>
                }
                
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
