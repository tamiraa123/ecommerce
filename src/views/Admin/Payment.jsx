import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,ButtonToolbar, 
  MenuItem,
  Table,
  Media,
  Label,
  Carousel,Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";



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
      url:"",
      rangeFrom:0,
      rangeTo:0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.state.name = "American Express";
    this.state.description ="Founded in 1850";
    this.state.url = "https://americanexpress.com";
    this.state.rangeFrom = 1001;
    this.state.rangeTo = 2000
  }


  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }
  handleSavebtn= () => {
    //save action
   this.props.history.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="content">

        <Grid fluid>
        <ButtonToolbar>
        <Button onClick={this.goBack}>
                Back
        </Button>
        </ButtonToolbar>
          <Row>
            <Col md={8}>
              <Card
                title="Payment method"
                content={
                  <form>
                      
                   <FormInputs
                      ncols={["col-md-4", "col-md-6"]} 
                      properties={[
                        {
                          label: "Bank Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          defaultValue: this.state.name,
                          name:"name",
                          onChange:this.handleChange.bind(this)   
                        },
                        {
                          label: "URL",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "URL",
                          defaultValue: this.state.url,
                          name:"url",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]
                    }
                    />
                    <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Description</ControlLabel>
                              <FormControl componentClass="textarea" value={this.state.description}/>
                    </FormGroup>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3"]} 
                      properties={[
                        {
                          label: "FROM",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "FROM",
                          defaultValue: this.state.rangeFrom,
                          name:"rangeFrom",
                          onChange:this.handleChange.bind(this)   
                        },
                        {
                          label: "TO",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "TO",
                          defaultValue: this.state.rangeTo,
                          name:"rangeTo",
                          onChange:this.handleChange.bind(this) 
                        }
                      ]
                    }
                    />

                    <Button bsStyle="info" pullRight fill onClick={this.handleSavebtn}>
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
