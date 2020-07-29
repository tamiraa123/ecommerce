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
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import "./SignUp.css";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {observer} from "mobx-react";
import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  constructor(props){
    super(props);
    
    this.state={
      vendor : {
      companyName:"",
      status:"",
      email:"",
      custServContactNo : "",
      vendorContactNo : "",
      street:"",
      city:"",
      state:"",
      zip:"",
      description : ""
      }
    }
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }
  render() {
    return (
      <div className="cont">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="Vendor Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      properties={[
                        {
                          name: "companyName",
                          label: "Company Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company Name",
                          defaultValue: "Rolex",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          name: "status",
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          defaultValue: "New",
                          disabled: true
                        },
                        {
                          name: "email",
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email address",
                          defaultValue: "rolexToEShop@rolex.com",
                          onChange:this.handleChange.bind(this) 
                          // disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          name: "custServContactNo",
                          label: "Customer service phone number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Customer service phone number",
                          defaultValue: "(319) 338-4212",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          name: "vendorContactNo",
                          label: "Vendor phone number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor phone number",
                          defaultValue: "(312) 951-1041",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          name: "street",
                          label: "Address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Address",
                          defaultValue:
                            "Rolex Boutique Tourneau Michigan Ave",
                            onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          name: "city",
                          label: "City",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: "Chicago",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          name: "state",
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "State",
                          defaultValue: "Illinois",
                          onChange:this.handleChange.bind(this) 
                        },
                        {
                          name: "zip",
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          defaultValue: 60611,
                          onChange:this.handleChange.bind(this) 
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Company Description</ControlLabel>
                          <FormControl
                            name = {"description"}
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your companny description"
                            defaultValue="Crafted from the finest raw materials and assembled with scrupulous attention to detail. Explore the Rolex® collection and find the watch that was made for you. Worldwide Servicing. Wide Range. Timeless style. Made in Switzerland. Unparalleled prestige."
                            onChange = {this.handleChange.bind(this)} 
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Done
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

export default observer(UserProfile);
