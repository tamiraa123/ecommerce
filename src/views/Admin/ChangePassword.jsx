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
      password,
      newPassword,
      confirmPassword,
      error: null,
      loading: false,
    }
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
    //                   address.city:result.data[0].city,
    //                   address.street:result.data[0].street,
    //                   address.state:result.data[0].state,
    //                   address.zip:result.data[0].zip,
    //                   role:result.data[0].role,
    //                   image:result.data[0].image,
    //                 })
    //   )
    //   .catch((err) => 
    //       this.setState({ loading: false, error: err.response }));

    // this.setState({ loading: false, 
    //   id: 1, 
    //   firstname:"Tamir",
    //   lastname:"Baldandorj",
    //   email:"tamir.baldandorj@gmail.com",
    //   status:"Active",
    //   phone:"6418191115",
    //   address:{
    //     city:"Fairfield",
    //     street:"asdasd",
    //     state:"Iowa",
    //     zip:"52556",
    //   },
    //   role:"Admin",
    //   image:"https://specials-images.forbesimg.com/imageserve/5d3d7a55f1176b000897d627/960x0.jpg?fit=scale",            
    // })

  }

  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
        <Grid fluid>
            <FormGroup>
                <ControlLabel>Old Password</ControlLabel>
                <FormControl value = {this.state.password} />
            </FormGroup>
            <FormGroup>
                <ControlLabel>New Password</ControlLabel>
                <FormControl value = {this.state.newPassword} />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl value = {this.state.confirmPassword} />
            </FormGroup>
            <Button bsStyle="info" pullRight fill type="submit"  onClick={ this.saveBtn }>
                      Update Profile
            </Button>
        </Grid>
        )}
      </div>
    );
  }
}

export default UserProfile;
