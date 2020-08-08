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
import axios from "axios";
import Spinner from "../../Spinner";
import iconuser from '../../assets/img/iconuser.png'
import firebase from '../../firebase';
import server from "../../server.json";

//Example data
const statusD = ["SUSPENDED", "ACTIVE", "DELETED"];

const styles = {
  border: 0,
};
const styleFile = {
  display: "none"
};

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      image: "",
      email: "",
      status: statusD[0], //active fired drop
      vendorName: "",
      phone: "",
      custServContactNo: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      error: null,
      loading: false,
      imageGlobal: iconuser,
      files: []
    }

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleChange = this.handleChange(this);
  }
  //Status event
  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
  }
  //Text input event
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
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

  //save Profile
  saveBtn = async () => {
    console.log("saveBtn()");
    if (this.state.files.length) {
      //upload image file.name should be userid
      let bucketName = 'images/vendor/'
      let file = this.state.files[0]
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
      // let storageRef = firebase.storage().ref(`${bucketName}/${"1.jps"}`)
      let uploadTask = storageRef.put(file)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          //let downloadURL = uploadTask.snapshot.downloadURL
        }
      )
      //show image
      let storageRef1 = firebase.storage().ref()
      storageRef1.child(`${bucketName}/${file.name}`).getDownloadURL().then((url) => {
        this.setState({ imageGlobal: url })
      })
    }
    //save value

    this.setState({ loading: true });
    await axios
      .put(
        server.url + "/vendors/" + this.props.match.params.id,
        {
          vendorId: this.state.id,
          imageUrl: this.state.image,
          username: this.state.email,
          status: this.state.status,
          vendorName: this.state.vendorName,
          phone: this.state.phone,
          contactMethod: this.state.custServContactNo,
          description: this.state.description,
          address: this.state.address,
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
          loading: false,
          id: result.data.vendorId,
          image: result.data.imageUrl,
          email: result.data.username,
          status: result.data.status,
          vendorName: result.data.vendorName,
          phone: result.data.phone,
          custServContactNo: result.data.contactMethod,
          description: result.data.description,
          address: result.data.address,
        })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        console.log(err);
      }
      );
    //.........
  }

  //edit Image
  editImage = async () => {
    console.log("editImage()")
    document.getElementById('selectedFile').click();
  }

  componentDidMount = async () => {

    //console.log(this.props.match.params.id);
    this.setState({ loading: true });
    await axios
      .get(server.url + "/vendors/" + this.props.match.params.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        // console.log(result)
        this.setState({
          loading: false,
          id: result.data.vendorId,
          image: result.data.imageUrl,
          email: result.data.username,
          status: result.data.status,
          vendorName: result.data.vendorName,
          phone: result.data.phone,
          custServContactNo: result.data.contactMethod,
          description: result.data.description,
          address: result.data.address,
        })
      }
      )
      .catch((err) =>
        this.setState({ loading: false, error: err.response }));
    //Setting example data
    // await this.setState({
    //   loading: false,
    //   id: 1,
    //   image: "images/employee/1.jpg",
    //   email: "tamir@rolex.com",
    //   status: "Active",
    //   vendorName: "Rolex",
    //   phone: "77777777777",
    //   custServContactNo: "888888888",
    //   description: "sdasdasdas",
    //   address: "",
    // })

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
                <Col md={8}>
                  <Card
                    title="Vendor"
                    content={
                      <form>
                        <input type="file" style={styleFile} id="selectedFile" onChange={(e) => { this.handleUploadChange(e.target.files) }} />
                        <div onClick={this.editImage}>
                          <Image style={styles} width={250} height={200} src={this.state.imageGlobal} rounded />
                        </div>


                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
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
                              label: "Vendor Phone Number",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Vendor Phone Number",
                              defaultValue: this.state.phone,
                              name: "phone",
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "Customer Service Contact Number",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Customer Service Contact Number",
                              defaultValue: this.state.custServContactNo,
                              name: "custServContactNo",
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

export default Vendor;
