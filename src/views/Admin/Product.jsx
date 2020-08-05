import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Label,
  Carousel
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-switch";
import axios from "axios";
import Spinner from "../../Spinner";
import firebase from '../../firebase';

//Example data
const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];
//Example data
const imgURLs = [
  { url: "images/employee/1.jpg" },
  { url: "images/employee/1.jpg" },
  { url: "images/employee/1.jpg" },
];
const styleCarousel ={
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      images: [],
      isActive: false,
      productDetails: [],
      category: "",
      error: null,
      loading: false,
      imageGlobal: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  //Save Profile
  saveBtn = () => {

  }

  componentDidMount = async () => {
    //  this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/products/1")
    //   .then((result) =>{
    //         console.log(result.data[0])  
    //         this.setState({ loading: false, 
    //                       id: result.data[0].id, 
    //                       productDetails : result.data[0].productDetails,
    //                       images : result.data[0].images,
    //                       name : result.data[0].name,
    //                       brand : result.data[0].brand,
    //                       price : result.data[0].price,
    //                       quantity : result.data[0].quantity,
    //                       isActive : result.data[0].isActive,
    //                       description : result.data[0].description,
    //                       category : result.data[0].category,              
    //                     })
    //               }
    //   )
    //   .catch((err) => 
    //       this.setState({ loading: false, error: err.response }));
    //Setting example data
    await this.setState({
      loading: false,
      id: 1,
      productDetails: specifications,
      images: imgURLs,
      name: "Laptop1",
      brand: "Apple",
      price: 1000,
      quantity: 3,
      isActive: true,
      description: "asldkflaksdj",
      category: "Electronic",
    })

   

    //show image
    //  show picture
    let storageRef1 = firebase.storage().ref()
    let tempTable = [this.state.images.length];
    for (let i = 0; i < this.state.images.length; i++) {
      
      tempTable[i] = (await storageRef1.child(this.state.images[i].url).getDownloadURL());
      console.log(tempTable[i]);
    }
    this.setState({
      imageGlobal: tempTable
    },console.log(tempTable));


    // for(let i = 0; i < imageGlobal.length; i++){
    //     let storageRef1 = firebase.storage().ref()
    //     storageRef1.child(this.state.images[i]).getDownloadURL().then((url) => {
    //       //this.setState({ imageGlobal: url })
    //       imageGlobal[i] = url;
    //     })
    // }
    

  }

  handleChange(event) {
    this.setState({ isActive: event });
  }

  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
            <Grid fluid>
              <Row>
                <Col md={9}>
                  <Card
                    title="Product"
                    content={
                      <form>
                        <Carousel >
                          {this.state.imageGlobal.map((url) => {
                            return (
                              <Carousel.Item >
                                <img style={styleCarousel}  width={300} height={400} src={url} />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>

                        <h2>{this.state.name}</h2>
                        <p>
                          <Row className="show-grid">
                            <Col xs={4} md={6}>
                              <Label>Price: </Label> &nbsp; {this.state.price}
                            </Col>
                            <Col xs={4} md={6}>
                              <Label>Category: </Label>&nbsp; {this.state.category}
                            </Col>
                          </Row>
                          <Row className="show-grid">
                            <Col xs={4} md={6}>
                              <Label>Brand: </Label>&nbsp; {this.state.brand}
                            </Col>
                            <Col xs={4} md={6}>
                              <Label>Quantity: </Label>&nbsp; {this.state.quantity}
                            </Col>

                          </Row>
                          <Row className="show-grid">
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Description</ControlLabel>
                              <FormControl componentClass="textarea" value={this.state.description} disabled={true} />
                            </FormGroup>
                          </Row>
                        </p>


                        <label>
                          <span>Product is Active </span>
                          <Switch onChange={this.handleChange} checked={this.state.isActive} className="react-switch" />
                        </label>

                        <Table striped hover>
                          <thead>
                            <tr>
                              <th>Specification</th>
                              <th>Specification Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.productDetails.map((prop, key) => {
                              return (
                                <tr key={key}>
                                  <td> {prop.specName} </td>
                                  <td> {prop.specValue} </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>

                        <Button bsStyle="info" pullRight fill type="submit" onClick={this.saveBtn}>
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

export default Product;
