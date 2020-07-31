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
                      ncols={["col-md-2", "col-md-2", "col-md-2", "col-md-2"]}
                      properties={[
                        {
                          label: "CNumber",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "CNumber",
                          defaultValue: this.state.cnum,
                          name: "CNumber",
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
                      <FormControl componentClass="textarea" />
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

                    {/* <FormInputs
                      ncols={["col-md-2 pullRight fill"]}
                      properties={[
                        {
                          label: "Product Images",
                          type: "submit",
                          bsClass: "form-control",
                          name: "uploadPicsButton",
                          onChange: this.handleChange.bind(this)
                        }
                      ]
                      }
                    /> */}
                    {/* <Row>
                    <div className="col-md-2">
                          <Button bsStyle="info" pullLeft fill onClick = {this. }>
                            Update
                          </Button>
                    </div>
                    </Row> */}
                    <ImageUploader
                      withIcon={true}
                      withPreview ={true}
                      buttonText='Choose images'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                    />
                    <div>
                      <Carousel>
                        {this.state.images.map((url) => {
                          return (
                            <Carousel.Item>
                              <img width={500} height={400} src={url.url} />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                    {/* <FilePond allowMultiple={true} /> */}
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

export default Vcard;
