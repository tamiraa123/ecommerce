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
  Table,
  Media,
  Label,
  Carousel,Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import Switch from "react-switch";
import { DiagnosticCategory } from "typescript";


const specifications = [
  {specName:"CPU",specValue: "1,5 Ghz"},
  {specName:"RAM",specValue: "16 GB"},
  {specName:"Hard SSD", specValue: "500GB"},
];
const imgURLs = [
  {url:"https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"},
  {url:"https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"},
  {url:"https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg"},
];

class Product extends Component {
  constructor(props){
    super(props);
    
    this.state={
      id:0,
      name:"",
      description:"",
      price:"",
      brand:"",
      quantity:"",
      images:[],
      isActive:false,
      productDetails:[],
      category:""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.state.productDetails = specifications;
    this.state.images = imgURLs; 
    this.state.name = "Laptop 1";
    this.state.brand ="Apple";
    this.state.price = "1000$";
    this.state.quantity = "10";
    this.state.isActive = true;
    this.state.description = "This laptop is best selling laptop"
    this.state.category = "Electronic"
  }

  handleChange(event) {
     this.setState({isActive:event });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Product"
                content={
                  <form>
                   <Carousel>
                   {this.state.images.map((url) => {
                        return (
                            <Carousel.Item>
                              <img width={500} height={400} src={url.url} />
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
                              <FormControl componentClass="textarea" value={this.state.description} disabled={true}/>
                            </FormGroup>
                          </Row>
                        </p>

                    
                    <label>
                      <span>Product is Active </span>
                      <Switch onChange={this.handleChange} checked={this.state.isActive} className="react-switch"/>
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

                    <Button bsStyle="info" pullRight fill type="submit">
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

export default Product;
