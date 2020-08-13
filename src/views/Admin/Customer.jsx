import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  DropdownButton,
  MenuItem,
  Image,
  Label,
  Panel,
  Modal,
  Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";
import firebase from '../../firebase';
import iconuser from '../../assets/img/iconuser.png'
import server from "../../server.json";

//Example data
const statusD = ["ACTIVE", "SUSPENDED","DELETED"];

const styles = {
  border: 0,
  cursor: 'pointer'
};
const styleFile = {
  display: "none"
};
class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      image: "",
      email: "",
      status: statusD[0], //active fired drop
      firstName: "",
      lastName: "",
      phone: "",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      totalScore: "",
      cards:[],
      error: null,
      loading: false,
      imageGlobal: iconuser,
      files: [],
      show: false
    }

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleChange = this.handleChange(this);

  }
  //save Profile
  saveBtn = async () => {
    // console.log("saveBtn()");
    if (this.state.files.length) {
      //upload image file.name should be userid
      let bucketName = 'images/user'
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
    this.setState({ loading: true });
    await axios
      .put(
        server.url + "/users/" + this.props.match.params.id,
        {
          employeeId: this.state.id,
          imageUrl: this.state.image,
          username: this.state.email,
          status: this.state.status,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone,
          shippingAddress: this.state.shippingAddress,
          billingAddress: this.state.billingAddress,
          totalScore: this.state.totalScore,
          cards:this.state.cards
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
          image: result.data.imageUrl,
          email: result.data.username,
          status: result.data.status,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          phone: result.data.phone,
          shippingAddress: result.data.shippingAddress,
          billingAddress: result.data.billingAddress,
          totalScore: result.data.totalScore,
          cards: this.state.cards
        })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        // console.log(err);
      }
      );
  }
  handleCloseModal = () => {
    this.setState({ show: false });
  }

  //Status change event  
  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
    // console.log(this.state.status)
  }
  //input text event 
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
    this.setState({ error: event.target.validationMessage });
  }
  //change state shipping
  handleChangeShipping(event) {
    const { target: { name, value } } = event
      this.setState({
        shippingAddress: {
          ...this.state.shippingAddress, [name]: event.target.value
        }
      });   
      this.setState({ error: event.target.validationMessage });
  }
  //change state billing
  handleChangeBilling(event) {
    const { target: { name, value } } = event
      this.setState({
        billingAddress: {
          ...this.state.billingAddress, [name]: event.target.value
        }
      });  
      this.setState({ error: event.target.validationMessage });
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
    this.setState({ loading: true, isAddEmployee: false });
    await axios
      .get(server.url + "/users/" + this.props.match.params.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        // console.log(result.data)
        this.setState({
          loading: false,
          id: result.data.employeeId,
          image: result.data.imageUrl,
          email: result.data.username,
          status: result.data.status,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          phone: result.data.phone,
          shippingAddress: result.data.shippingAddress,
          billingAddress: result.data.billingAddress,
          totalScore: result.data.totalScore,
          cards:result.data.cards
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
                    title="Customers Profile"
                    content={
                      <form>
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        <Row className="show-grid">
                          <Col xs={12} md={5}>
                            <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                            <div onClick={this.editImage}>
                              <Image style={styles} width={250} height={200} src={this.state.imageGlobal} rounded />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <h4><Label bsStyle="success">Total Score:</Label> {this.state.totalScore == null ? "0" : this.state.totalScore} point</h4>
                          </Col>

                        </Row>
                        <FormInputs
                          ncols={["col-md-3", "col-md-3", "col-md-6"]}
                          properties={[
                            {
                              label: "First Name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "First Name",
                              name: "firstName",
                              defaultValue: this.state.firstName,
                              onChange: this.handleChange.bind(this),
                              pattern: "^[a-zA-Z]{2,40}$",
                            },
                            {
                              label: "Last Name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Last Name",
                              defaultValue: this.state.lastName,
                              name: "lastName",
                              onChange: this.handleChange.bind(this),
                              pattern: "^[a-zA-Z]{2,40}$",
                            },
                            {
                              label: "E-mail",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Email",
                              defaultValue: this.state.email,
                              name: "email",
                              onChange: this.handleChange.bind(this),
                              disabled: "true"
                            },
                          ]
                          }
                        />
                        <FormInputs
                          ncols={["col-md-5"]}
                          onChange={this.handleChange}
                          properties={[
                            {
                              label: "Phone Number",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Phone Number",
                              defaultValue: this.state.phone,
                              name: "phone",
                              onChange: this.handleChange.bind(this),
                              pattern: "^[0-9]{10}$",
                            }
                          ]}
                        />

                        <Panel>
                          <Panel.Heading>
                            <Panel.Title componentClass="h3">Shipping address</Panel.Title>
                          </Panel.Heading>
                          <Panel.Body>
                            <FormInputs
                              ncols={["col-md-12"]}
                              properties={[
                                {
                                  label: "Street",
                                  type: "text",
                                  bsClass: "form-control",
                                  placeholder: "Street",
                                  defaultValue: this.state.shippingAddress == null ? "" : this.state.shippingAddress.street,
                                  name: "street",
                                  onChange: this.handleChangeShipping.bind(this)
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
                                  defaultValue: this.state.shippingAddress == null ? "" : this.state.shippingAddress.city,
                                  name: "city",
                                  onChange: this.handleChangeShipping.bind(this)
                                },
                                {
                                  label: "State",
                                  type: "text",
                                  bsClass: "form-control",
                                  placeholder: "Country",
                                  defaultValue: this.state.shippingAddress == null ? "" : this.state.shippingAddress.state,
                                  name: "state",
                                  onChange: this.handleChangeShipping.bind(this)
                                },
                                {
                                  label: "Postal Code",
                                  type: "number",
                                  bsClass: "form-control",
                                  placeholder: "ZIP Code",
                                  defaultValue: this.state.shippingAddress == null ? "" : this.state.shippingAddress.zip,
                                  name: "zip",
                                  onChange: this.handleChangeShipping.bind(this)
                                }
                              ]}
                            />

                          </Panel.Body>
                        </Panel>
                        <Panel>
                          <Panel.Heading>
                            <Panel.Title componentClass="h3">Billing address</Panel.Title>
                          </Panel.Heading>
                          <Panel.Body>
                            <FormInputs
                              ncols={["col-md-12"]}
                              properties={[
                                {
                                  label: "Street",
                                  type: "text",
                                  bsClass: "form-control",
                                  placeholder: "Street",
                                  defaultValue: this.state.billingAddress == null ? "" : this.state.billingAddress.street,
                                  name: "street",
                                  onChange: this.handleChangeBilling.bind(this)
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
                                  defaultValue: this.state.billingAddress == null ? "" : this.state.billingAddress.city,
                                  name: "city",
                                  onChange: this.handleChangeBilling.bind(this)
                                },
                                {
                                  label: "State",
                                  type: "text",
                                  bsClass: "form-control",
                                  placeholder: "Country",
                                  defaultValue: this.state.billingAddress == null ? "" : this.state.billingAddress.state,
                                  name: "state",
                                  onChange: this.handleChangeBilling.bind(this)
                                },
                                {
                                  label: "Postal Code",
                                  type: "number",
                                  bsClass: "form-control",
                                  placeholder: "ZIP Code",
                                  defaultValue: this.state.billingAddress == null ? "" : this.state.billingAddress.zip,
                                  name: "zip",
                                  onChange: this.handleChangeBilling.bind(this)
                                }
                              ]}
                            />
                          </Panel.Body>
                        </Panel>
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
                        <Button bsStyle="info" pullRight fill onClick={this.saveBtn}>
                          Update
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

export default Employee;
