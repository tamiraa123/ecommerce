import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  } from "react-bootstrap";

import firebase from '../../firebase';
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ImageUploader from 'react-images-upload';


const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];

class Newproduct extends Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      id: 0,
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      category: "",
      isActive: false,
      productDetails: [],
      images: [],
      imageLocalURLs: []
    }
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    let bucketName = 'images/vendor/1/products/'
    this.setState({
      images: this.state.images.concat(picture),
      imageLocalURLs: this.state.images.concat(picture).map(file => bucketName + file.name)
    }
    );
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value }, () => console.log(this.state))
  }
  handleDoneBtn = () => {
    //  upload picture
    let pictures = this.state.images//this.state.files[0]
    for (let i = 0; i < pictures.length; i++) {
      let storageRef = firebase.storage().ref(`${this.state.imageLocalURLs}`)
      let uploadTask = storageRef.put(this.state.images[i])
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          let downloadURL = uploadTask.snapshot.downloadURL
        }
      )
    }
    ///////////
    
    alert("Successfully added");
    //Go back
    this.props.history.goBack();
  }
  async componentDidMount() {
    this.setState({
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      category: "",
      isActive: false,
      productDetails: specifications,
      //images/vendor/1/products/1.jpg
      imageLocalURLs: "",
    });
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="New Product"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-2", "col-md-2"]}
                      properties={[
                        {
                          label: "Product Category",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "category",
                          defaultValue: this.state.category,
                          name: "category",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Manufacturer",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Brand",
                          defaultValue: this.state.brand,
                          name: "brand",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Price",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "price",
                          defaultValue: this.state.price,
                          name: "price",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Quantity",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Quantity",
                          defaultValue: this.state.quantity,
                          name: "quantity",
                          onChange: this.handleChange.bind(this)
                        },
                      ]
                      }
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Product Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          defaultValue: this.state.name,
                          name: "productname",
                          onChange: this.handleChange.bind(this)
                        }
                      ]
                      }
                    />
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Product Description</ControlLabel>
                      <FormControl
                        name="description"
                        rows="5"
                        componentClass="textarea"
                        bsClass="form-control"
                        placeholder="Product description"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Product Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {this.state.productDetails.map((prop, key) => {
                            return (
                              <td>
                                <FormInputs
                                  ncols={["col-md-12"]}
                                  properties={[
                                    {
                                      label: prop.specName,
                                      type: "text",
                                      bsClass: "form-control",
                                      placeholder: "Name",
                                      defaultValue: prop.specValue,
                                      name: "name",
                                      onChange: this.handleChange.bind(this)
                                    }
                                  ]
                                  }
                                />
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </Table>
                    <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      buttonText='Choose images'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                    />
                    <Button bsStyle="info" pullRight fill onClick={this.handleDoneBtn}>
                      Add
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

export default Newproduct;
