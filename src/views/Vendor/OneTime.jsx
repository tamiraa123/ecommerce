import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ImageUploader from 'react-images-upload';


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
                title="Dear Vendor,"
                content={
                  <form>
                    <blockquote>
                      <p>
                     <div className="text-danger">After one-time payment done, you will be able to use our web site with full functionality. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nulla! Voluptates saepe praesentium explicabo, tempore, quae consequuntur, totam quasi nemo corrupti illo ducimus nam nulla debitis consequatur? Rem, animi repellendus!</div>
                     </p>
                     <small>
                       "e-Shop team"
                       </small>
                     </blockquote>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Pay now
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
