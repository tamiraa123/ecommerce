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
import Button from "components/CustomButton/CustomButton.jsx";

import axios from "axios";
import Spinner from "../../Spinner";


const statusD = ["NEW", "ACTIVE", "BLOCKED"];

class Vendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      image: "https://i.pinimg.com/originals/c3/af/ba/c3afba827e7299415cb7034e00bc9533.jpg",
      email: "",
      status: statusD[0], //active fired drop
      vendorName: "",
      phone: "",
      custServContactNo: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      error: null,
      loading: false
    }

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleChange = this.handleChange(this);
  }

  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  componentDidMount() {
    // this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/employees")
    //   .then((result) =>{
    //         console.log(result.data[0])  
    //         this.setState({ loading: false, 
    //                       id: result.data[0].id, 
    //                       image : result.data[0].image,
    //                       email : result.data[0].email,
    //                       status : result.data[0].status,
    //                       vendorName : result.data[0].vendorName,
    //                       phone : result.data[0].phone,
    //                       custServContactNo : result.data[0].custServContactNo,
    //                       description : result.data[0].description,
    //                       address : result.data[0].address,              
    //                     })
    //               }
    //   )
    //   .catch((err) => 
    //       this.setState({ loading: false, error: err.response }));
    
          this.setState({ loading: false, 
            id: 1, 
            image : "https://i.pinimg.com/originals/c3/af/ba/c3afba827e7299415cb7034e00bc9533.jpg",
            email : "tamir@rolex.com",
            status : "Active",
            vendorName : "Rolex",
            phone : "77777777777",
            custServContactNo : "888888888",
            description : "sdasdasdas",
            address : "",               
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
                title="Vendor"
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
                          name: "image",
                          onChange: this.handleChange.bind(this)
                        }
                      ]}
                    />
                    
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Vendor Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor Name",
                          name: "vendorName",
                          defaultValue: this.state.vendorName,
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "E-mail",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.email,
                          name: "email",
                          onChange: this.handleChange.bind(this),
                          disabled: true
                        },
                      ]
                      }
                    />
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl name="description" onChange={this.handleChange.bind(this)} componentClass="textarea" value={this.state.description} />
                    </FormGroup>

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      onChange={this.handleChange}
                      properties={[
                        {
                          label: "Vendor Phone Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor Phone Number",
                          defaultValue: this.state.phone,
                          name: "phone",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Customer Service Contact Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Customer Service Contact Number",
                          defaultValue: this.state.custServContactNo,
                          name: "custServContactNo",
                          onChange: this.handleChange.bind(this)
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
                          name: "address.street",
                          onChange: this.handleChange.bind(this)
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
                          name: "address.city",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: this.state.address.state,
                          name: "address.state",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          defaultValue: this.state.address.zip,
                          name: "address.zip",
                          onChange: this.handleChange.bind(this)
                        }
                      ]}
                    />
                    <Row className="show-grid">

                      <Col xs={6} md={3}>
                        <ControlLabel>STATUS</ControlLabel><br />
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

export default Vendor;
