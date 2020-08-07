import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  DropdownButton,
  MenuItem,
  Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";
import firebase from '../../firebase';
import iconuser from '../../assets/img/iconuser.png'

const rolesD = ["ADMIN", "ENGINEER", "TICKET MANAGER"];
const statusD = ["ACTIVE", "FIRED", "BREAK"];

const styles = {
  border: 0,
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
      files: []
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
    this.setState({ [name]: value, event: event })
  }

  //save Profile
  saveBtn = async () => {
    console.log("saveBtn()");
    if (this.state.files.length) { 
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

  componentDidMount = async () => {
    //  this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/employees")
    //   .then((result) =>{
    //         console.log(result.data[0])  
    //         this.setState({ loading: false, 
    //                       id: result.data[0].id, 
    //                       image : result.data[0].image,
    //                       email : result.data[0].email,
    //                       status : result.data[0].status,
    //                       firstName : result.data[0].firstName,
    //                       lastName : result.data[0].lastName,
    //                       phone : result.data[0].phone,
    //                       address : result.data[0].address,
    //                       role : result.data[0].role,              
    //                     })
    //               }
    //   )
    //   .catch((err) => 
    //       this.setState({ loading: false, error: err.response }));
    //Setting example data
    await this.setState({
      loading: false,
      id: 1,
      image: "images/employee/1.jpg",
      email: "tamir.baldandorj@gmail.com",
      status: "Active",
      firstName: "Tamir",
      lastName: "Baldandorj",
      phone: "6418191115",
      address: "",
      role: "Admin",
      imageGlobal: iconuser,
      files: []
    })

    //show image
    let storageRef1 = firebase.storage().ref()
    storageRef1.child(this.state.image).getDownloadURL().then((url) => {
      this.setState({ imageGlobal: url })
    })
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
                    title="Employee Profile"
                    content={
                      <form>

                        <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                        <div onClick={this.editImage}>
                          <Image style={styles} width={250} height={200} src={this.state.imageGlobal} rounded />
                        </div>

                        {/* <FormInputs
                          ncols={["col-md-5"]}
                          onChange={this.handleChange}
                          properties={[
                            {
                              label: "Image URL",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Image URL",
                              defaultValue: this.state.image,
                              name: "image",
                              onChange: this.handleChange.bind(this)
                            }
                          ]}
                        /> */}
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
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "Last Name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Last Name",
                              defaultValue: this.state.lastName,
                              name: "lastName",
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "E-mail",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Email",
                              defaultValue: this.state.email,
                              name: "email",
                              onChange: this.handleChange.bind(this)
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
                              placeholder: "ZIP Code",
                              defaultValue: this.state.address.zip,
                              name: "address.zip",
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
