import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Carousel
} from "react-bootstrap";

import firebase from '../../firebase';
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import server from "../../server.json";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import ImageUploader from 'react-images-upload';
let categories = []
const statuses = [{
  label: 'NEW',
  value: 'NEW',
  children: [],
},
{
  label: 'UPLOADED',
  value: 'UPLOADED',
  children: []
},
{
  label: 'SUSPENDED',
  value: 'SUSPENDED',
  children: []
},
{
  label: 'DOWNLOADED',
  value: 'DOWNLOADED',
  children: []
},
{
  label: 'DELETED',
  value: 'DELETED',
  children: []
},
]


const styleCarousel = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};
const style = {
  width: "10%"
};
const styleTable = {
  width: "100%"
};

const onAction = (node, action) => {
  console.log('onAction::', action, node)
}
const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
}

// const urlsFromBackEnd = [
//   "images/vendor/VE1597012145741/products/logo.png",
//   "images/vendor/VE1597012145741/products/logo1.png",
// ];

class Product extends Component {
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
      categoryName : "",
      categoryId : "",
      status: "",
      productDetails: [],
      images: [],
      imageLocalURLs: [],
      imageGlobalURLs: []
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onChangeStatus(currentNode, selectedNodes) {
    console.log('onChange::', currentNode, selectedNodes)
    this.setState({ status: selectedNodes[0].label }, () => console.log(this.state))
  }
  onChangeCategory(currentNode, selectedNodes) {
    console.log('onChange::', currentNode, selectedNodes)
    this.setState({ status : "NEW", categoryName: selectedNodes[0].label, categoryId: selectedNodes[0].value }, () => console.log(this.state))
  }
  onDrop(picture) {
    let bucketName = `images/vendor/${localStorage.getItem("userId")}/products/`
    this.setState({
      images: this.state.images.concat(picture),
      imageLocalURLs: this.state.images.concat(picture).map(file => bucketName + file.name)
    },
    console.log("ondrop",this.state)
    );
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value }, console.log(name, value, this.state))
  }
  handleSpec(event) {
    const { target: { name, value } } = event
    let prodDet = this.state.productDetails;
    let idx = name.split(".")[1];
    prodDet[idx].specValue = value;
    // console.log(name, value, this.state)
    this.setState({ productDetails: prodDet}, console.log(name, value, this.state))
  }
  handleDoneBtn = async (event) => {
    //send Post request to update product info price, category, manifacturer, quantity
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
    
    await axios
      .put(
        server.url + "/products/update/" + this.props.match.params.id,
        {
          productName : this.state.name,
          description : this.state.description,
          price: this.state.price,
          vendorId : localStorage.getItem("userId"),
          manufacturer: this.state.brand,
          categoryName : this.state.categoryName,
          categoryId : this.state.categoryId,
          imageList : this.state.imageLocalURLs,
          currentQuantity: this.state.quantity,
          productDetails: this.state.productDetails,
          status: this.state.status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        },
      )
      .then((result) => {
        console.log(result)
        alert("Successful")
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        console.log(err);
      }
      );


    //Go back
    // this.props.history.goBack();
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    await axios
      .get(server.url + "/products/" + this.props.match.params.id,
      {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      })
      .then((result) => {
        console.log("data", result.data);
        this.setState({
          id: result.data.productId,
          name: result.data.productName,
          description: result.data.description,
          brand: result.data.manufacturer,
          price: result.data.price,
          quantity: result.data.currentQuantity,
          categoryId: result.data.categoryId,
          categoryName: result.data.categoryName,
          productDetails : result.productDetails,
          vendorId: result.data.vendorId,
          status: result.data.status,
          // images: [],
          imageLocalURLs: result.data.imageList,
          imageGlobalURLs: []
        },
          () => {
            console.log(this.state)
          }
        )



      })
      .catch((err) =>
        this.setState({ error: "Error" })//err.response.data.error.message
      );

    //Load categories
    let url = server.url + "/categories";
    axios
      .get(url,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      .then((result) => {
        // console.log("categories", result.data);
        // categories = result.data[0].nodes;

        let str = JSON.stringify(result.data[0].nodes);
        // console.log("str1: ", str);
        str = str.replace(/nodes/g, 'children')
        str = str.replace(/key/g, 'value')
        // str = str.replace("nodes", "children");
        // str = str.replace("key", "value");
        console.log("str2: ", str);
        categories = JSON.parse(str);
        console.log("categories", categories);
      })
      .catch((err) =>
        this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
      );
    //  show picture
    if (this.state.images) {
      let storageRef1 = firebase.storage().ref()
      let tempTable = [this.state.imageLocalURLs.length];
      for (let i = 0; i < this.state.imageLocalURLs.length; i++) {
        tempTable[i] = (await storageRef1.child(this.state.imageLocalURLs[i]).getDownloadURL());
      }
      this.setState({
        imageGlobalURLs: tempTable
      }, console.log(tempTable));
    }
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="Product"
                content={
                  <form>
                    <table style={styleTable}>
                      <tr>
                        <td style={style}><label>CATEGORY</label></td>
                        <td style={style}><label>STATUS</label></td>
                      </tr>
                      <tr>
                        <td style={style}>
                          <DropdownTreeSelect
                            mode="radioSelect"
                            texts={{ placeholder: this.state.categoryName}}
                            data={categories}
                            onChange={this.onChangeCategory.bind(this)}
                            onAction={onAction}
                            onNodeToggle={onNodeToggle} />
                        </td>
                        <td style={style}>
                          <DropdownTreeSelect
                            mode="radioSelect"
                            texts={{ placeholder: this.state.status }}
                            disabled={this.state.status == "NEW"?true:false}
                            // inlineSearchInput={true}
                            // keepTreeOnSearch = {true}
                            // clearSearchOnChange = {false}
                            data={statuses}
                            onChange={this.onChangeStatus.bind(this)}
                            onAction={onAction}
                            onNodeToggle={onNodeToggle} />

                        </td>
                      </tr>
                    </table>

                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-2", "col-md-2"]}
                      properties={[
                        {
                          label: "Product Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          defaultValue: this.state.name,
                          name: "name",
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
                          {(this.state.productDetails)?this.state.productDetails.map((prop, key) => {
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
                                      name: "specValue."+key,
                                      onChange: this.handleSpec.bind(this)
                                    }
                                  ]
                                  }
                                />
                              </td>
                            );
                          }):""}
                        </tr>
                      </tbody>
                    </Table>

                    <Carousel >
                      {this.state.imageGlobalURLs.map((url) => {
                        return (
                          <Carousel.Item >
                            <img style={styleCarousel} width={300} height={400} src={url} />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                    <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      buttonText='Re-Select images'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                    />
                    <Button bsStyle="info" pullRight fill onClick={this.handleDoneBtn}>
                      Update Product
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

export default Product;
