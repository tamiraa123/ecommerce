import React, { Component } from "react";

import { Grid, Row, Col, ControlLabel, DropdownButton, MenuItem, FormControl, FormGroup } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import server from "../../server.json";
import DropdownTreeSelect from 'react-dropdown-tree-select'
const onAction = (node, action) => {
  console.log('onAction::', action, node)
}
const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
}
let products = []
class Promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoNo: "",
      promoName: "",
      from: "",
      to: "",
      productid: "",
      productName: "",
      discount: "",
      promotionDescription: ""
    }
  }
  onChangeCategory(currentNode, selectedNodes) {
    console.log('onChange::', currentNode, selectedNodes)
    this.setState({ productName: selectedNodes[0].label, productId: selectedNodes[0].value }, () => console.log(this.state))
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })

    console.log(this.state)
  }

  componentDidMount = async () => {
    if (this.props.match.params.id != "new") {

      //Product List

      let url = server.urlHenok + "/products/vendor/" + localStorage.getItem("userId");
      await axios
        .get(url,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
        .then((result) => {
          console.log("prod res:", result)
          let size = result.data.length;
          console.log("size", size)
          products = [];
          for (let i = 0; i < size; i++) {
            products.push({ label: result.data[i].productName, value: result.data[i].productId, children: [] });
          }

          console.log("products", products);
        })
        .catch((err) =>
          this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
        );

      this.setState({ loading: true });
      await axios
        .get(server.url + "/promotions/" + this.props.match.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then((result) => {
          console.log("result", result);
          this.setState({
            promoNo: result.data.id,
            promoName: result.data.promoName,
            from: result.data.startDate,
            to: result.data.endDate,
            productid: result.data.productId,
            discount: result.data.promotionPercentage,
            promotionDescription: result.data.promotionDescription,
          }, () => console.log(this.state))
          this.setState({ loading: false })
        }
        )
        .catch((err) => this.setState({ loading: false, error: err.response }));



    }
    else {
      this.setState({ promoNo: "Will be provided soon" })
    }
  }


  handleDoneBtn = async (event) => {
    //send Post request to update product info price, category, manifacturer, quantity
    if (this.props.match.params.id != "new") {
      console.log("url: ",server.urlHenok + "/promotions/" + this.props.match.params.id)
      console.log(this.state)
      await axios
        .put(
          server.urlHenok + "/promotions/update/" + this.props.match.params.id,
          {
            id: "5f30ae4f301eb50d91907224",//this.state.promoNo,
            productId: "15DE5HIM80HJK",//this.state.productId,
            vendorId: localStorage.getItem("userId"),
            promoName: "test", //this.state.promoName,
            promotionPercentage: 10, //this.state.discount,
            startDate: "2019-12-28", //this.state.from,
            endDate: "2019-12-28", //this.state.to,
            promotionDescription: "test",//this.state.promotionDescription
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdW5rQG11bmsuY29tIiwiaWF0IjoxNTk3MTc4Mzg3LCJleHAiOjE1OTcyNjQ3ODd9.KY63_84uoA0utptn3eqXRbnv50-6ff-B5owKjCezJoH_yTZOPxTTPBINgVtmaZmhepTZZ1zZg_gr1dTmcs3wSQ`// ${localStorage.getItem("token")}`
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

    }
    else {

    }
    //Go back
    // this.props.history.goBack();
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
                          disabled: true,
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
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Promotion Description</ControlLabel>
                      <FormControl name="promotionDescription" onChange={this.handleChange.bind(this)} componentClass="textarea" value={this.state.promotionDescription} />
                    </FormGroup>
                    <DropdownTreeSelect
                      mode="simpleSelect"
                      texts={{ placeholder: this.state.productName }}
                      data={products}
                      onChange={this.onChangeCategory.bind(this)}
                      onAction={onAction}
                      onNodeToggle={onNodeToggle} />

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

export default Promo;
