import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      description: "",
      url: "",
      rangeFrom: 0,
      rangeTo: 0,
      error: null,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/employees")
    //   .then((result) => {
    //     console.log(result.data[0])
    //     this.setState({
    //       loading: false,
    //       id: result.data[0].id,
    //       name: result.data[0].name,
    //       description: result.data[0].description,
    //       url: result.data[0].url,
    //       rangeFrom: result.data[0].rangeFrom,
    //       rangeTo: result.data[0].rangeTo
    //     })
    //   }
    //   )
    //   .catch((err) =>
    //     this.setState({ loading: false, error: err.response }));
    //Setting example
    this.setState({
          id: 1,
          name: "Amex",
          description: "sadasda",
          url: "https://americanexpress.com",
          rangeFrom: 1001,
          rangeTo: 2000
    })
  }

//Text Input event
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }
//Save action
  handleSavebtn = () => {
    this.props.history.goBack();
  }
//Back to history
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
            <Grid fluid>
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
                              name: "name",
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "URL",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "URL",
                              defaultValue: this.state.url,
                              name: "url",
                              onChange: this.handleChange.bind(this)
                            }
                          ]
                          }
                        />
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Description</ControlLabel>
                          <FormControl componentClass="textarea" value={this.state.description} />
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
                              name: "rangeFrom",
                              onChange: this.handleChange.bind(this)
                            },
                            {
                              label: "TO",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "TO",
                              defaultValue: this.state.rangeTo,
                              name: "rangeTo",
                              onChange: this.handleChange.bind(this)
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
          )}
      </div>
    );
  }
}

export default Product;
