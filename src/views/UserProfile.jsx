import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Image,
  Modal,
  Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../Spinner";
import firebase from '../firebase';
import iconuser from '../assets/img/iconuser.png'
import server from "../server.json";


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
      files: [],
      show: false
    }
    this.editImage = this.editImage.bind(this);
  }
  //input text change
  handleChange(event) {
    const { target: { name, value } } = event
    if ([name] == "street" || [name] == "city" || [name] == "state" || [name] == "zip") {
      this.setState({
        address: {
          ...this.state.address, [name]: event.target.value
        }
      });
    } else {
      this.setState({ [name]: value, event: event })
    }
  }

  //save UserProfile
  saveBtn = async () => {
    // console.log("saveBtn()");
    // console.log(this.state.files);
    this.setState({ loading: true });
    if (this.state.files.length) {
      //upload image file.name should be userid
      let bucketName = `images/employee`
      let file = this.state.files[0]
      // console.log(file);
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
      // let storageRef = firebase.storage().ref(`${bucketName}/${"1.jps"}`)
      let uploadTask = storageRef.put(file)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          let downloadURL = uploadTask.snapshot.downloadURL
        }
      )
      await this.setState({ image: `${bucketName}/${file.name}` })
      //show image
      let storageRef1 = firebase.storage().ref()
      storageRef1.child(`${bucketName}/${file.name}`).getDownloadURL().then((url) => {
        this.setState({ imageGlobal: url })
      })
    }

    //save value    //add employee API avah
    let urlLocal = server.url + "/employees/" + localStorage.getItem('userId');
    await axios
      .put(urlLocal,
        {
          employeeId: this.state.id,
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          username: this.state.email,
          status: this.state.status,
          phone: this.state.phone,
          address: this.state.address,
          imageUrl: this.state.image,
          role: this.state.role
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
      )
      .then((result) => {
        // console.log(result)
        this.setState({
          loading: false, show: true,
          id: result.data.employeeId,
          firstname: result.data.firstName,
          lastname: result.data.lastName,
          email: result.data.username,
          status: result.data.status,
          phone: result.data.phone,
          address: result.data.address,
          role: result.data.role,
          image: result.data.imageUrl,
        })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        // console.log(err);
      }
      );
    //.........


  }

  handleCloseModal = () => {
    this.setState({ show: false });
  }

  handleUploadChange = async (files) => {
    // console.log("handleUploadChange()")

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
    // console.log("editImage()")
    document.getElementById('selectedFile').click();
  }

  componentDidMount = async () => {
    // console.log("UserProfile->componentDidMount")

    this.setState({ loading: true });
    await axios
      .get(server.url + "/employees/" + localStorage.getItem('userId'), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        // console.log(result.data)
        this.setState({
          loading: false,
          id: result.data.employeeId,
          firstname: result.data.firstName,
          lastname: result.data.lastName,
          email: result.data.username,
          status: result.data.status,
          phone: result.data.phone,
          address: result.data.address,
          role: result.data.role,
          image: result.data.imageUrl,
        })
      }
      )
      .catch((err) =>
        this.setState({ loading: false, error: err.response }));
    //show image
    if (this.state.image) {
      try {
        let storageRef1 = firebase.storage().ref()
        storageRef1.child(this.state.image).getDownloadURL().then((url) => {
          this.setState({ imageGlobal: url })
        })
      } catch (err) { }
    }
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
                <Col md={12}>
                  <Card
                    title="Edit Profile"
                    content={
                      <form>
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                        <div onClick={this.editImage}>
                          <Image style={styles} width={250} height={200} src={this.state.imageGlobal} rounded />
                        </div>
                        <br />

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
                              defaultValue: this.state.address == null ? "" : this.state.address.street,
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
                              defaultValue: this.state.address == null ? "" : this.state.address.city,
                              name: "city",
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "State",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Country",
                              defaultValue: this.state.address == null ? "" : this.state.address.state,
                              name: "state",
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "Postal Code",
                              type: "number",
                              bsClass: "form-control",
                              defaultValue: this.state.address == null ? "" : this.state.address.zip,
                              name: "zip",
                              onChange: this.handleChange.bind(this)
                            }
                          ]}
                        />
                        <Button bsStyle="info" pullRight fill onClick={this.saveBtn}>
                          Update Profile
                        </Button>
                        <Modal
                          show={this.state.show}
                          onHide={this.handleCloseModal}
                          container={this}
                          aria-labelledby="contained-modal-title"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                              Success
                                </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Successfully updated
                              </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseModal}>Close</Button>
                          </Modal.Footer>
                        </Modal>
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
