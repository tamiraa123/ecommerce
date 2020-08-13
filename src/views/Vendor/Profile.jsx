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
import axios from "axios";
import server from "../../server.json";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import iconuser from '../../assets/img/iconuser.png'
import firebase from '../../firebase';

const styleFile = {
  display: "none"
};
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      role: "",
      id: 0,
      image: "",
      email: "",
      status: "", //active fired drop
      vendorName: "",
      phone: "",
      since: "",
      custServContactNo: "",
      description: "",
      cards : "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      imageGlobal: iconuser,
      files: []
    }

   // this.handleChange = this.handleChange(this);
  }
  componentDidMount = async () => {
    this.setState({ id: localStorage.getItem("userId") });
    this.setState({ token: localStorage.getItem("token") });
    this.setState({ role: localStorage.getItem("role") });
    axios
      .get(server.url + "/vendors/" + localStorage.getItem("userId"), {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      }
      )
      .then((result) => {
        console.log("data")
        console.log(result.data)
        this.setState({
          // description: result.data.description,
          vendorName: result.data.vendorName,
          custServContactNo: result.data.contactMethod,
          phone: result.data.phone,
          email: result.data.username,
          status: result.data.status,
          since: result.data.createdDate,
          image: result.data.imageUrl,
          cards : result.cards
        })
        if (result.data.address) {this.setState({address: result.data.address})}
        if (result.data.description) {this.setState({description: result.data.description})}
        let storageRef1 = firebase.storage().ref()
        // console.log(this.state.image)
        storageRef1.child(result.data.imageUrl).getDownloadURL().then((url) => {
          this.setState({ imageGlobal: url }, () => console.log(this.state))
        })
      })
      .catch((err) =>
        this.setState({ error: "Error" })//err.response.data.error.message
      );


  }
  saveBtn = async () => {
    console.log("saveBtn()");
    if (this.state.files) {
      //upload image file.name should be userid
      let bucketName = `images/vendor/${this.state.id}/`;

      // console.log(file);
      if (this.state.files[0]) {
        console.log("pic");
        let file = this.state.files[0];

        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
        // let storageRef = firebase.storage().ref(`${bucketName}/${"1.jps"}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {

          }
        )
        //show image
        let storageRef1 = firebase.storage().ref()
        storageRef1.child(`${bucketName}/${file.name}`).getDownloadURL().then((url) => {
          this.setState({ imageGlobal: url })
        })
      }
      else
        console.log("no pic");
    }

    //PUT
    // this.setState({ loading: true });
    await axios
      .put(
        server.url + "/vendors/" + localStorage.getItem("userId"),
        {
          vendorId: localStorage.getItem("userId"),
          imageUrl: this.state.image,
          status: this.state.status,
          vendorName: this.state.vendorName,
          phone: this.state.phone,
          cards : this.state.cards,
          contactMethod: this.state.custServContactNo,
          description: this.state.description,
          address: this.state.address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        },
      )
      .then((result) => {
        console.log(result)
        this.setState({
          // loading: false,
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

  }

  handleChange(event) {
    const { target: { name, value } } = event
    if ([name] == "street" || [name] == "city" || [name] == "state" || [name] == "zip") {
      this.setState({
        address: {
          ...this.state.address, [name]: event.target.value
        }
      });
    } else { this.setState({ [name]: value }); }
    console.log(this.state);
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
    let bucketName = `images/vendor/${this.state.id}/`;
    this.setState({ image: bucketName + "/" + file.name });
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
                      ncols={["col-md-4", "col-md-3", "col-md-2", "col-md-3"]}
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
                        },
                        {
                          label: "Member since",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          defaultValue: this.state.since,
                          name: "since",
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
                          defaultValue: this.state.address.city,
                          name: "city",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "State",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: this.state.address.state,
                          name: "state",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          defaultValue: this.state.address.zip,
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
                            <Image width="100%" src={this.state.imageGlobal} rounded />
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
