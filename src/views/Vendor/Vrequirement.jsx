import React, { Component } from "react";

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import 'filepond/dist/filepond.min.css';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
// import { FilePond, registerPlugin } from 'react-filepond';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// registerPlugin(FilePondPluginImagePreview);

const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];
const imgURLs = [
  { url: "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg" },
  { url: "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg" },
  { url: "https://images-na.ssl-images-amazon.com/images/I/61EVOldh9XL._AC_SL1000_.jpg" },
];

class Product extends Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      reqNo: 0,
      reqStatus: "In Progress",
      reqDesc: "test desc",
      assignedTo: "Munkhzorig",
      createdDate: "2020-07-30",
      startDate: "2020-07-31",
      finishDate: "2020-07-31",
      finishDate: "2020-07-31",
      closeDate: "2020-08-01",
      reqName: "Add COLOR option",
      reqDesc: "Test req"
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
    this.state.images = imgURLs;
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
                title="Requirement"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Requirement Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Requirement Number",
                          defaultValue: this.state.reqNo,
                          name: "reqNo",
                          onChange: this.handleChange.bind(this),
                          disabled : true
                        },

                        {
                          label: "Requirement Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Requirement Status",
                          defaultValue: this.state.reqStatus,
                          name: "reqStatus",
                          onChange: this.handleChange.bind(this)
                        },
                        
                        {
                          label: "Assigned To",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Assigned To",
                          defaultValue: this.state.assignedTo,
                          name: "assignedTo",
                          disabled: true,
                          onChange: this.handleChange.bind(this)
                        },
                      ]
                      }
                    />
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3 "]}
                      properties={[
                        {
                          label: "Created Date",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Creation Date",
                          defaultValue: this.state.createdDate,
                          disabled: true,
                          name: "createdDate",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Work Start Date",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Work Start Date",
                          defaultValue: this.state.startDate,
                          disabled: true,
                          name: "startDate",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Work Finish Date",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Work Finish Date",
                          defaultValue: this.state.finishDate,
                          disabled: true,
                          name: "finishDate",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Closed Date",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Closed Date",
                          defaultValue: this.state.closeDate,
                          disabled: true,
                          name: "closeDate",
                          onChange: this.handleChange.bind(this)
                        },
                      ]
                      }
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Requirement Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Requirement Name",
                          defaultValue: this.state.reqName,
                          name: "reqName",
                          onChange: this.handleChange.bind(this)
                        },

                      ]
                      }
                    />
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Requirement description</ControlLabel>
                      <FormControl componentClass="textarea" defaultValue = {this.state.reqDesc}/>
                    </FormGroup>

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

export default Product;
