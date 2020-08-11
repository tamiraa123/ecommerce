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
import TreeMenu from 'react-simple-tree-menu';
import axios from "axios";
import server from "../../server.json";

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
      role: "",
      token : "",
      userId : "",
      id: 0,
      name: "",
      description: "",
      price: 0,
      brand: "",
      quantity: 0,
      categoryId: null,
      categoryName: null,
      productDetails: [],
      images: [],
      imageLocalURLs: []
    }
    this.onDrop = this.onDrop.bind(this);
    this.handleChangeTree = this.handleChangeTree.bind(this);
  }
  onDrop(picture) {
    let bucketName = `images/vendor/${localStorage.getItem("userId")}/products/`
    this.setState({
      images: this.state.images.concat(picture),
      imageLocalURLs: this.state.images.concat(picture).map(file => bucketName + file.name)
    }
    );
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event }, () => console.log(this.state))
  }
  handleChangeTree(event) {
    console.log(event)
    this.setState({ categoryId: event.key });
    this.setState({ categoryName: event.label });
  }
  handleDoneBtn = (event) => {
    //  upload picture
    let pictures = this.state.images//this.state.files[0]
    for (let i = 0; i < pictures.length; i++) {
      let storageRef = firebase.storage().ref(`${this.state.imageLocalURLs[i]}`)
      let uploadTask = storageRef.put(this.state.images[i])
      console.log(this.state.imageLocalURLs[i]);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          let downloadURL = uploadTask.snapshot.downloadURL
        }
      )
    }
    ///////////POST
    let path = server.urlHenok+"/products/create";
    console.log(path);
  axios
    .post(path,
      {
        productName: this.state.name,
        price: this.state.price,
        description: this.state.description,
        manufacturer: this.state.brand,
        currentQuantity: this.state.quantity,
        productDetails: [],
        vendorId: localStorage.getItem("userId"),
        categoryName: this.state.categoryName,
        categoryId: this.state.categoryId,
        status: "NEW",
        imageList: this.state.imageLocalURLs
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      },
      
    )
    .then((result) => {
      console.log(result);
      alert("Successfully added");
      this.props.history.goBack();
      // window.location = '/';
    })
    .catch((err) =>
      this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
    );
    // event.preventDefault();
    // 
    //Go back
    // 
  }
  async componentDidMount() {
    this.setState({ token: localStorage.getItem("token") });
    this.setState({ role: localStorage.getItem("role") });
    this.setState({ userId: localStorage.getItem("userId") });
    this.setState({
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      category: "",
      productDetails: specifications,
      //images/vendor/1/products/1.jpg
      imageLocalURLs: "",
    });
    
    let url = server.urlHenok + "/categories";
    axios
    .get(url,        {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    },)
    .then((result) => {
      // console.log("11111111111111111111111");
      console.log(result.data);
      this.setState({ category: result.data});
    })
    .catch((err) =>
      this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
    );
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
                    <TreeMenu onClickItem={this.handleChangeTree}
                      data={this.state.category}>
                    </TreeMenu>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
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
                          name: "name",
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
