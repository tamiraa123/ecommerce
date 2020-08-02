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
import ImageUploader from 'react-images-upload';
import avatar from "assets/img/faces/face-3.jpg";


const statusD = ["NEW", "ACTIVE", "BLOCKED"];

class Profile extends Component {
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
            <Col md={12}>
              <Card
                title="Vendor"
                content={
                  <form>

                    <FormInputs
                      ncols={["col-md-5", "col-md-5", "col-md-2"]}
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
                        {
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          defaultValue: this.state.status,
                          name: "status",
                          disabled: true,
                          onChange: this.handleChange.bind(this)
                        }
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
                          defaultValue: this.state.phone,
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
                    <ImageUploader
                      withIcon={true}
                      withPreview={false}
                      buttonText='Choose images'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                    />
                    <div width="100%" text-align="center">
                      <Row width="100%">
                        <Col md={4}>
                        </Col>
                        <Col md={4}>
                          <Image width = "100%" src={this.state.image} rounded />
                        </Col>
                        <Col md={4}>
                        </Col>
                      </Row>
                    </div>

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

export default Profile;
