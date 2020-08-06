import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
  Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ImageUploader from 'react-images-upload';
import iconuser from '../../assets/img/iconuser.png'
import firebase from '../../firebase';
const statusD = ["NEW", "ACTIVE", "BLOCKED"];
const styleFile = {
  display: "none"
};
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      image: iconuser,
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
      },
      files: []
    }

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleChange = this.handleChange(this);
  }

  saveBtn = async () => {
    console.log("saveBtn()");
    if (this.state.files)
    {
      //upload image file.name should be userid
      let bucketName = 'images/vendor/1/'
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
    }
  }

  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value})
  }
  editImage = async () => {
    document.getElementById('selectedFile').click();
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
          image: reader.result
        });
      }
      reader.readAsDataURL(file)
    } catch (err) {
      this.setState({ image: iconuser });
    }
  }
  componentDidMount = async () => {
    let storageRef1 = firebase.storage().ref()
    storageRef1.child(this.state.image).getDownloadURL().then((url) => {
      this.setState({ image: url })
    })
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Vendor"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-5", "col-md-2"]}
                      properties={[
                        {
                          label: "Vendor Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor Name",
                          name: "vendorName",
                          defaultValue: this.state.vendorName,
                          onChange: this.handleChange.bind(this)
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
                        {
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          defaultValue: this.state.status,
                          name: "status",
                          disabled: true,
                          onChange: this.handleChange.bind(this)
                        }
                      ]
                      }
                    />
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl name="description" onChange={this.handleChange.bind(this)} componentClass="textarea" value={this.state.description} />
                    </FormGroup>

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      onChange={this.handleChange}
                      properties={[

                        {
                          label: "Customer Service Contact Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Customer Service Contact Number",
                          defaultValue: this.state.custServContactNo,
                          name: "custServContactNo",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Vendor Contact Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Vendor Contact Number",
                          defaultValue: this.state.phone,
                          name: "vendorContactNo",
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
                          placeholder: "ZIP Code",
                          defaultValue: this.state.zip,
                          name: "zip",
                          onChange: this.handleChange.bind(this)
                        }
                      ]}


                    />
                    <div width="100%" text-align="center">
                      <Row width="100%">
                        <Col md={4}>
                        </Col>
                        <Col md={4}>
                          <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                          <div onClick={this.editImage}>
                            <Image width="100%" src={this.state.image} rounded />
                          </div>
                        </Col>
                        <Col md={4}>
                        </Col>
                      </Row>
                    </div>

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
      </div>
    );
  }
}

export default Profile;
