import React, { Component } from "react";
import {
  Grid,
  Row,
  Col, 
  Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../Spinner";
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      image: "",
      email: "",
      status: "", //active fired drop
      firstname: "",
      lastname: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      role: "",//admin, engineer  drop
      error: null,
      loading: false,
    }
  }
  //input text change
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }
  //save Profile
  saveBtn = () => {
      
  }
  //load
  componentDidMount = () => {
    console.log("UserProfile->componentDidMount")
    // this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/profile")
    //   .then((result) =>
    //     //console.log(result.data[0].id)  
    //     this.setState({ loading: false, 
    //                   id: result.data[0].id, 
    //                   firstname:result.data[0].firstname,
    //                   lastname:result.data[0].lastname,
    //                   email:result.data[0].email,
    //                   status:result.data[0].status,
    //                   phone:result.data[0].phone,
    //                   city:result.data[0].city,
    //                   street:result.data[0].street,
    //                   state:result.data[0].state,
    //                   zip:result.data[0].zip,
    //                   role:result.data[0].role,
    //                   image:result.data[0].image,
    //                 })
    //   )
    //   .catch((err) => 
    //       this.setState({ loading: false, error: err.response }));

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
                title="Edit Profile"
                content={
                  <form>
                    <Image width={250} height={200} src={this.state.image} rounded />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Image URL",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: this.state.image,
                          name: "image",
                          onChange: this.handleChange.bind(this)
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "First Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First Name",
                          defaultValue: this.state.firstname,
                          name: "firstname",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Last Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last Name",
                          defaultValue: this.state.lastname,
                          name: "lastname",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          name: "image",
                          onChange: this.handleChange.bind(this)
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
                          name: "phone",
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
                          defaultValue: this.state.zip,
                          name: "zip",
                          onChange: this.handleChange.bind(this)
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit"  onClick={ this.saveBtn }>
                      Update Profile
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

export default UserProfile;
