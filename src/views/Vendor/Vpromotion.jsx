import React, { Component } from "react";
import { Grid, Row, Col, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-switch";

const products = ["Laptop 1", "Laptop 2", "Laptop 3"];
const specifications = [
  { specName: "CPU", specValue: "1,5 Ghz" },
  { specName: "RAM", specValue: "16 GB" },
  { specName: "Hard SSD", specValue: "500GB" },
];

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoNo: 0,
      promoName: "",
      from: "",
      to: "",
      product: "",
      discount: "",
      isActive: ""
    }
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleChangeRole(event) {
    // this.setState({role: rolesD[event]});
  }

  handleChangeStatus(event) {
    // this.setState({status: statusD[event]});
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
                title="Promotion"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "Promotion Code",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Promotion Code",
                          defaultValue: this.state.promoNo,
                          name: "promoNo",
                          onChange: this.handleChange.bind(this)
                        },

                        {
                          label: "Promo Valid From",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Promo Valid From",
                          defaultValue: this.state.from,
                          name: "from",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Promo Valid To",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Promo Valid To",
                          defaultValue: this.state.to,
                          name: "to",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Discount(%)",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Discount(%)",
                          defaultValue: this.state.discount,
                          name: "discount",
                          onChange: this.handleChange.bind(this)
                        }
                      ]
                      }
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Promotion name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Promotion name",
                          defaultValue: this.state.promoName,
                          name: "promoName",
                          onChange: this.handleChange.bind(this)
                        }

                      ]
                      }
                    />
                   


                    <Row className="show-grid">
                      <Col xs={6} md={3}>
                        <ControlLabel>PRODUCT</ControlLabel><br />
                        <DropdownButton
                          title={this.state.role}
                          id="document-type"
                          onSelect={this.handleChangeRole}
                        >
                          {products.map((opt, i) => (
                            <MenuItem key={i} eventKey={i}>
                              {opt}
                            </MenuItem>
                          ))}
                        </DropdownButton>
                      </Col>
                      <Col xs={6} md={3}>
                        <ControlLabel>ACTIVE</ControlLabel><br />
                        <Switch
                          onChange={this.handleChange}
                          checked={this.state.isActive}
                          className="react-switch"
                        />
                      </Col>
                    </Row>


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
