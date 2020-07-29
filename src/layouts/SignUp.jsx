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
  render() {
    return (
      <div className="cont">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="Edit Vendor Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      properties={[
                        {
                          label: "Company Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company Name"
                        },
                        {
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          defaultValue: "Active",
                          disabled: true
                        },
                        {
                          label: "Email address/username",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: "rolexToEShop@rolex.com",
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Customer service phone number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Customer service phone number",
                          defaultValue: "(319) 338-4212"
                        },
                        {
                          label: "Vendor contact phone number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor contact phone number",
                          defaultValue: "(312) 951-1041"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Adress",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue:
                            "Rolex Boutique Tourneau Michigan Ave"
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
                          defaultValue: "Chicago"
                        },
                        {
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "State",
                          defaultValue: "Illinois"
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          defaultValue: 60611
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Company Description</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your companny description"
                            defaultValue="Crafted from the finest raw materials and assembled with scrupulous attention to detail. Explore the Rolex® collection and find the watch that was made for you. Worldwide Servicing. Wide Range. Timeless style. Made in Switzerland. Unparalleled prestige."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
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
