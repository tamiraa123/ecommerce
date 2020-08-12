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
      productId: "",
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
            productId: result.data.productId,
            discount: result.data.promotionPercentage,
            promotionDescription: result.data.promotionDescription,
          }, () => console.log(this.state))
          this.setState({ loading: false })
        }
        )
        .catch((err) => this.setState({ loading: false, error: err.response }));

        let url = server.urlHenok + "/products/vendor/" + localStorage.getItem("userId");
        console.log(url);
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
              if(result.data[i].productId == this.state.productId)
                this.setState({productName : result.data[i].productName});
            }
  
            console.log("products", products);
          })
          .catch((err) =>
            this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
          );
  
        this.setState({ loading: true });

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
            id: this.state.promoNo,
            productId: this.state.productId,
            vendorId: localStorage.getItem("userId"),
            promoName: this.state.promoName,
            promotionPercentage: this.state.discount,
            startDate: this.state.from,
            endDate: this.state.to,
            promotionDescription: this.state.promotionDescription
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
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
      // console.log(server.urlHenok + "/requirements");
      await axios
        .post(
          server.urlHenok + "/promotions/add",
          {
            productId: this.state.productId,
            vendorId: localStorage.getItem("userId"),
            promoName: this.state.promoName,
            promotionPercentage: this.state.discount,
            startDate: this.state.from,
            endDate: this.state.to,
            promotionDescription: this.state.promotionDescription
        },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
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


      //Go back
      // this.props.history.goBack();   
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
