import React, { Component } from "react";

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import 'filepond/dist/filepond.min.css';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Label,
  Carousel, Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ImageUploader from 'react-images-upload';
// import { FilePond, registerPlugin } from 'react-filepond';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// registerPlugin(FilePondPluginImagePreview);

const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];

class Vcard extends Component {
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
      images: [],
      isActive: false,
      productDetails: [],
      category: ""
    }
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      images: this.state.images.concat(picture),
    });
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })

    console.log(this.state.images)
  }

  componentDidMount() {
    this.state.productDetails = specifications;
  
    this.state.name = "Laptop 1";
    this.state.brand = "Apple";
    this.state.price = "1000$";
    this.state.quantity = "10";
    this.state.isActive = true;
    this.state.description = "This laptop is best selling laptop"
    this.state.category = "Electronic"
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="Card"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "Financial Service Provider",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Financial Service Provider",
                          defaultValue: this.state.provider,
                          name: "provider",
                          disabled: true,
                          onChange: this.handleChange.bind(this)
                        },

                        {
                          label: "CNumber",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "CNumber",
                          defaultValue: this.state.cnum,
                          name: "cnum",
                          onChange: this.handleChange.bind(this)
                        },

                        {
                          label: "Card Holder's Full Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Card Holder's Full Name",
                          defaultValue: this.state.fullname,
                          name: "fullname",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Expiration date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Expiration date",
                          defaultValue: this.state.expDate,
                          name: "expDate",
                          onChange: this.handleChange.bind(this)
                        },
                      ]
                      }
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
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

export default Vcard;
