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
import firebase from '../firebase';
import iconuser from '../assets/img/iconuser.png'


const styles = {
  border: 0,
};
const styleFile = {
  display: "none"
};
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
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      role: "",//admin, engineer  drop
      error: null,
      loading: false,
      imageGlobal: iconuser,
      files: []
    }
    this.editImage = this.editImage.bind(this);
  }
  //input text change
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })

  }
  //save Profile
  saveBtn = async () => {
    console.log("saveBtn()");
    if (this.state.files) {
      //upload image file.name should be userid
      let bucketName = 'images/employee/'
      let file = this.state.files[0]
      console.log(file);
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
      // let storageRef = firebase.storage().ref(`${bucketName}/${"1.jps"}`)
      let uploadTask = storageRef.put(file)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          let downloadURL = uploadTask.snapshot.downloadURL
        }
      )

      //show image
      let storageRef1 = firebase.storage().ref()
      storageRef1.child(`${bucketName}/${file.name}`).getDownloadURL().then((url) => {
        this.setState({ imageGlobal: url })
      })
     
    }

    //save value

    //.........
  }
  handleUploadChange = async (files) => {
    console.log("handleUploadChange()")

    //saving image to state
    await this.setState({
      files: files,
    })

    //Rendering image to <Image/>
    let reader = new FileReader();
    let file = files[0];
    try {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imageGlobal: reader.result
        });
      }
      reader.readAsDataURL(file)
    } catch (err) {
      this.setState({ imageGlobal: iconuser });
    }
  }

  //edit Image
  editImage = async () => {
    console.log("editImage()")
    document.getElementById('selectedFile').click();
  }


  //load
  componentDidMount = async () => {
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

    await this.setState({
      loading: false,
      id: 1,
      firstname: "Tamir",
      lastname: "Baldandorj",
      email: "tamir.baldandorj@gmail.com",
      status: "Active",
      phone: "6418191115",
      address: {
        city: "Fairfield",
        street: "asdasd",
        state: "Iowa",
        zip: "52556",
      },
      role: "Admin",
      image: "images/employee/1.jpg",
    })

    //show image
    let storageRef1 = firebase.storage().ref()
    storageRef1.child(this.state.image).getDownloadURL().then((url) => {
      this.setState({ imageGlobal: url })
    })

    //this.setState({ imageGlobal: url })


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
                        <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                        <div onClick={this.editImage}>
                          <Image style={styles} width={250} height={200} src={this.state.imageGlobal} rounded />
                        </div>
                        <br />
                        {/* <Button value="Browse..." >Upload    </Button> */}

                        {/* <FormInputs
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
                        /> */}
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
                              defaultValue: this.state.email,
                              name: "email",
                              onChange: this.handleChange.bind(this),
                              disabled: true
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
                              defaultValue: this.state.address.zip,
                              name: "address.zip",
                              onChange: this.handleChange.bind(this)
                            }
                          ]}
                        />
                        <Button bsStyle="info" pullRight fill onClick={this.saveBtn}>
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
