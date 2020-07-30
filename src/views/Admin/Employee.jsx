import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
  Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";


const rolesD = ["ADMIN", "ENGINEER", "TICKET MANAGER"];
const statusD = ["ACTIVE", "FIRED", "BREAK"];

class Employee extends Component {
  constructor(props){
    super(props);
    
    this.state={
      id:0,
      image:"https://specials-images.forbesimg.com/imageserve/5d3d7a55f1176b000897d627/960x0.jpg?fit=scale",
      email:"",
      status:statusD[0], //active fired drop
      firstname:"",
      lastname:"",
      phone:"",
      street:"",
      city:"",
      state:"",
      zip:"",
      role:rolesD[0]//admin, engineer  drop
    }

    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
   // this.handleChange = this.handleChange(this);
  }

  handleChangeRole(event) {
    this.setState({role: rolesD[event]});
  }

  handleChangeStatus(event) {
    this.setState({status: statusD[event]});
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
                title="Employee Profile"
                content={
                  <form>
                  <Image width={250} height={200} src={this.state.image} rounded />
                  <FormInputs
                      ncols={["col-md-5"]}
                      onChange={this.handleChange}
                      properties={[
                        {
                          label: "Image URL",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Image URL",
                          defaultValue: this.state.image,
                          name:"image",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-6"]} 
                      properties={[
                        {
                          label: "First Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First Name",
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
                          label: "E-mail",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.email,
                          name:"email",
                          onChange:this.handleChange.bind(this) 
                        },
                      ]
                    }
                    />
                    <FormInputs
                      ncols={["col-md-5"]}
                      onChange={this.handleChange}
                      properties={[
                        {
                          label: "Phone Number",
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
                          placeholder: "ZIP Code",
                          defaultValue: this.state.zip,
                          name:"zip",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                      <Row className="show-grid">
                        <Col xs={6} md={3}>
                        <ControlLabel>ROLE</ControlLabel><br/>
                              <DropdownButton
                                      title={this.state.role}
                                      id="document-type"
                                      onSelect={this.handleChangeRole}
                                    >
                                      {rolesD.map((opt, i) => (
                                        <MenuItem key={i} eventKey={i}>
                                          {opt}
                                        </MenuItem>
                                      ))}
                              </DropdownButton>
                        </Col>
                        <Col xs={6} md={3}>
                        <ControlLabel>STATUS</ControlLabel><br/>
                            <DropdownButton
                                    title={this.state.status}
                                    id="document-type"
                                    onSelect={this.handleChangeStatus}
                                  >
                                    {statusD.map((opt, i) => (
                                      <MenuItem key={i} eventKey={i}>
                                        {opt}
                                      </MenuItem>
                                    ))}
                            </DropdownButton>
                        </Col>
                      </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update
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

export default Employee;
