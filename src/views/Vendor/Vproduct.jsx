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

const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];
const styleCarousel = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

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
      category: "",
      isActive: false,
      productDetails: [],
      images: [],
      imageLocalURLs: [],
      imageGlobalURLs: []
    }
  }


  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value }, console.log(this.state.imageLocalURLs))
  }
  handleDoneBtn = async () => {
    //send Post request to update product info price, category, manifacturer, quantity
    await axios
      .put(
        server.urlHenok + "/products/update/" + this.props.match.params.id,
        {
          price: this.state.price,
          manufacturer: this.state.brand,
          currentQuantity: this.state.quantity,
          productDetails: [],
          status: this.state.status
        }
      )
      .then((result) => {
        console.log(result)
        // this.setState({
        //   // loading: false,
        //   id: result.data.vendorId,
        //   image: result.data.imageUrl,
        //   email: result.data.username,
        //   status: result.data.status,
        //   vendorName: result.data.vendorName,
        //   phone: result.data.phone,
        //   custServContactNo: result.data.contactMethod,
        //   description: result.data.description,
        //   address: result.data.address,
        // })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        console.log(err);
      }
      );


    //Go back
    this.props.history.goBack();
  }
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    await axios
      .get(server.urlHenok + "/products/" + this.props.match.params.id)
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
          // productDetails : result.productDetails,
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
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-2", "col-md-2"]}
                      properties={[
                        {
                          label: "Product Category",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "category",
                          defaultValue: this.state.categoryName,
                          name: "categoryName",
                          disabled : true,
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
                      ncols={["col-md-9", "col-md-3"]}
                      properties={[
                        {
                          label: "Product Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          defaultValue: this.state.name,
                          name: "name",
                          disabled : true,
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Status",
                          defaultValue: this.state.status,
                          name: "status",
                          onChange: this.handleChange.bind(this)
                        }
                      ]
                      }
                    />
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Product Description</ControlLabel>
                      <FormControl
                        disabled = "true"
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
                                      name: "specValue",
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
                    <Carousel >
                      {this.state.imageGlobalURLs.map((url) => {
                        return (
                          <Carousel.Item >
                            <img style={styleCarousel} width={300} height={400} src={url} />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                    <Button bsStyle="info" pullRight fill onClick={this.handleDoneBtn}>
                      Done
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
