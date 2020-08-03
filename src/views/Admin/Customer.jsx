import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  DropdownButton,
  MenuItem,
  Image,
  Label
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";


const statusD = ["ACTIVE", "DEACTIVE"];

class Employee extends Component {
  constructor(props){
    super(props);
    
    this.state={
      id:0,
      image:"",
      email:"",
      status:statusD[0], //active fired drop
      firstName:"",
      lastName:"",
      phone:"",
      address:{
        street:"",
        city:"",
        state:"",
        zip:""
      },
      totalScore:"",
      error: null,
      loading: false,
    }

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
   // this.handleChange = this.handleChange(this);
  }

  
  handleChangeStatus(event) {
    this.setState({status: statusD[event]});
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  componentDidMount() {
    //  this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/employees")
    //   .then((result) =>{
    //         console.log(result.data[0])  
    //         this.setState({ loading: false, 
    //                       id: result.data[0].id, 
    //                       image : result.data[0].image,
    //                       email : result.data[0].email,
    //                       status : result.data[0].status,
    //                       firtName : result.data[0].firtName,
    //                       lastName : result.data[0].lastName,
    //                       phone : result.data[0].phone,
    //                       address : result.data[0].address,
    //                       totalScore : result.data[0].totalScore,
    //                     })
    //               }
    //   )
    //   .catch((err) => 
    //       this.setState({ loading: false, error: err.response }));
    
    this.setState({ loading: false, 
     id: 1, 
      image : "https://www.vocalcom.com/wp-content/uploads/the-role-of-emotions-in-the-customer-experience.jpg",
      email : "tamir.baldandorj@gmail.com",
      status : "Active",
      firtName : "Tamir",
      lastName :"Baldandorj",
      phone : "6419181115",
      address : "",
      totalScore : 123230,           
    })

  }

  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Customers Profile"
                content={
                  <form>
                  <Row className="show-grid">
                    <Col xs={12} md={5}>
                    <Image width={250} height={200} src={this.state.image} rounded />
                    </Col>
                    <Col xs={6} md={4}>
                    <h4><Label bsStyle="success">Total Score:</Label> {this.state.totalScore}</h4>
                    </Col>
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
                  </Row>
                  
                    
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-6"]} 
                      properties={[
                        {
                          label: "First Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First Name",
                          name:"firstName",
                          onChange:this.handleChange.bind(this)   
                        },
                        {
                          label: "Last Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last Name",
                          defaultValue: this.state.lastName,
                          name:"lastName",
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
                          defaultValue: this.state.address.street,
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
                          defaultValue: this.state.address.city,
                          name:"city",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: this.state.address.state,
                          name:"state",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          defaultValue: this.state.address.zip,
                          name:"zip",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                      <Row className="show-grid">
            
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
        )}
      </div>
    );
  }
}

export default Employee;
