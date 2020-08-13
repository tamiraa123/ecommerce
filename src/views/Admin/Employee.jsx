import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  DropdownButton,
  MenuItem,
  Image,
  Modal,
  Alert
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";
import firebase from '../../firebase';
import iconuser from '../../assets/img/iconuser.png'
import server from "../../server.json";
import bgavatar from "../../assets/img/bgavatar.jpeg";

const rolesD = ["ROLE_ADMIN", "ROLE_ENGINEER", "ROLE_MANAGER"];
const statusD = ["ACTIVE", "SUSPENDED", "DELETED"];

const styles = {
  border: 0,
  cursor: 'pointer'
};
const styleFile = {
  display: "none"
};
const StyleAvatar = {
  height:"100px"
}
const avatar = {
 height:"210px",
 width:"210px"
}
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
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      role: rolesD[0],//admin, engineer  drop
      error: null,
      loading: false,
      imageGlobal: iconuser,
      files: [],
      isAddEmployee: true,
      show: false,
      redirect:false
    }

    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleChange = this.handleChange(this);
  }

  handleChangeRole(event) {
    this.setState({ role: rolesD[event] });
  }

  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
  }
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
    this.setState({ error: event.target.validationMessage });
  }

  //save Profile
  saveBtn = async () => {
    this.setState({ loading: true });

   
    // console.log("saveBtn()");
    if (this.state.files.length) {
      //upload image file.name should be userid
      let bucketName = 'images/employee'
      let file = this.state.files[0]
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
      // let storageRef = firebase.storage().ref(`${bucketName}/${"1.jps"}`)
      let uploadTask = storageRef.put(file)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          // let downloadURL = uploadTask.snapshot.downloadURL
        }
      )

      //show image
      let storageRef1 = firebase.storage().ref()
      storageRef1.child(`${bucketName}/${file.name}`).getDownloadURL().then((url) => {
        this.setState({ imageGlobal: url })
      })
    }
    //save value    //add employee API avah
    let urlLocal = server.url + "/employees/" + this.props.match.params.id;
    await axios
      .put(urlLocal,
        {
          employeeId: this.state.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.email,
          status: this.state.status,
          phone: this.state.phone,
          address: this.state.address,
          imageUrl: this.state.image,
          role: this.state.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
      )
      .then((result) => {
        this.setState({
          loading: false, show: true,
          id: result.data.employeeId,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
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

      }
      );
      if(this.props.match.params.id==localStorage.getItem('userId'))
      {
        this.setState({redirect:true});
      }
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
    //console.log("editImage()")
    document.getElementById('selectedFile').click();
  }

  componentDidMount = async () => {

    if (this.props.match.params.id == 0) {
      this.setState({ isAddEmployee: true })
    }  //adding Employee
    else {
      this.setState({ loading: true, isAddEmployee: false });
      await axios
        .get(server.url + "/employees/" + this.props.match.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then((result) => {
          // console.log(result.data)
          this.setState({
            loading: false,
            id: result.data.id,
            image: result.data.imageUrl,
            email: result.data.username,
            status: result.data.status,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            phone: result.data.phone,
            address: result.data.address,
            role: result.data.role,
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
                    title="Employee Profile"
                    content={
                      <form>
                        {this.state.redirect && (
                          <Redirect to='/' />
                        )}
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                        <div >
                          <div className="card card-user">
                            <div className="image">
                              <img src={bgavatar} />
                            </div>
                            <div className={StyleAvatar}>
                              <div className="author">
                                <a href="#pablo">
                                  <img style={avatar}
                                    className="avatar border-gray"
                                    src={this.state.imageGlobal}
                                    onClick={this.editImage}
                                  />
                                  <h4 className="title">
                                    <small>{this.state.firstName + " " + this.state.lastName}</small>
                                  </h4>
                                </a>
                              </div>
                            </div>
                            <hr />
                          </div>
                          {/* <Image style={styles} width={250} height={200} src={this.state.imageGlobal} rounded /> */}
                        </div>
                        <br />


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
                              disabled: true
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
                              placeholder: "ZIP Code",
                              defaultValue: this.state.address == null ? "" : this.state.address.zip,
                              name: "zip",
                              onChange: this.handleChange.bind(this)
                            }
                          ]}
                        />
                        <Row className="show-grid">
                          <Col xs={6} md={3}>
                            <ControlLabel>ROLE</ControlLabel><br />
                            <DropdownButton
                              title={this.state.role}
                              id="document-type"
                              onSelect={this.handleChangeRole}
                            >
                              {rolesD.map((opt, i) => (
                                <MenuItem key={i} eventKey={i}>
                                  {opt}
                                </MenuItem>
                              ))}
                            </DropdownButton>
                          </Col>
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
                        <div className="clearfix" />
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
