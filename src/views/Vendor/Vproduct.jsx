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

const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];
const styleCarousel ={
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

const urlsFromBackEnd = [
  "images/vendor/1/products/h1.jpg",
  "images/vendor/1/products/h2.jpg",
];

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
    this.setState({ [name]: value}, console.log(this.state.imageLocalURLs))
  }
  handleDoneBtn = () => {
    //send Post request to update product info price, category, manifacturer, quantity

    //Go back
    this.props.history.goBack();
  }
  async componentDidMount() {
    this.setState({
      name: "Laptop 1",
      description: "This laptop is best selling laptop",
      price: "1000$",
      brand: "Apple",
      quantity: "10",
      category: "Electronic",
      status: "Active",
      productDetails: specifications,
      //images/vendor/1/products/1.jpg
      imageLocalURLs: urlsFromBackEnd,
    });
    //  show picture
    let storageRef1 = firebase.storage().ref()
    let tempTable = [urlsFromBackEnd.length];
    for (let i = 0; i < urlsFromBackEnd.length; i++) {
      tempTable[i] = (await storageRef1.child(urlsFromBackEnd[i]).getDownloadURL());
    }
    this.setState({
      //"https://firebasestorage.googleapis.com/v0/b/eshop-abfb2.appspot.com/o/images%2Fvendor%2F1%2Fproducts%2F2.jpg?alt=media&token=602fb3e1-ac23-4967-9634-b8030e6b5909"
      imageGlobalURLs: tempTable
    }, console.log(this.state.imageGlobalURLs));
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
                      ncols={["col-md-9", "col-md-3"]}
                      properties={[
                        {
                          label: "Product Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          defaultValue: this.state.name,
                          name: "productname",
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
                    <Carousel >
                          {this.state.imageGlobalURLs.map((url) => {
                            return (
                              <Carousel.Item >
                                <img style={styleCarousel}  width={300} height={400} src={url} />
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
