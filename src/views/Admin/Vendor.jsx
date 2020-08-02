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
      vendorContactNo: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      }
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

  render() {
    return (
      <div className="content">
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
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      onChange={this.handleChange}
                      properties={[
                        {
                          label: "Phone Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Phone Number",
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
                        },
                        {
                          label: "Vendor Contact Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor Contact Number",
                          defaultValue: this.state.vendorContactNo,
                          name: "vendorContactNo",
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
                          defaultValue: this.state.street,
                          name: "street",
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
                          defaultValue: this.state.city,
                          name: "city",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: this.state.state,
                          name: "state",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          defaultValue: this.state.zip,
                          name: "zip",
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
      </div>
    );
  }
}

export default Vendor;
