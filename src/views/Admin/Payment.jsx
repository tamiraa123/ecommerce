import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Modal,
  Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";
import server from "../../server.json";



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
      loading: false,

    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleCloseModal = () => {
    this.setState({ show: false });
    this.props.history.goBack();
  }

  saveBtn = async () => {
    console.log('sadfas')
    this.setState({ loading: true });
    await axios
      .post(
        server.url + "/card/addpaymentmethod",
        {
          id: this.state.id == 0 ? null:this.state.id,
          name: this.state.name,
          description: this.state.description,
          url: this.state.url,
          rangeFrom: this.state.rangeFrom,
          rangeTo: this.state.rangeTo
        }
        ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
      )
      .then((result) => {
         console.log(result)
         this.setState({loading:false,show:true});
        // this.setState({
        //   loading: false, show: true,
        //   id: result.data.id,
        //   name: result.data.name,
        //   description: result.data.description,
        //   url: result.data.url,
        //   rangeFrom: result.data.rangeFrom,
        //   rangeTo: result.data.rangeTo
        // })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        // console.log(err);
      }
      );
    
    //....
  }
    //Text Input event
    handleChange(event) {
      const { target: { name, value } } = event
      this.setState({ [name]: value, event: event })
      this.setState({ error: event.target.validationMessage });
    }
  

  componentDidMount = async () => {
    this.setState({ loading: true });
    if (this.props.match.params.id == 0) { 
      this.setState({id : 0,loading:false}); 
    }
    else {
      await axios
        .get(server.url + "/card/paymentmethod/" + this.props.match.params.id
          , {headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },}
        )
        .then((result) => {
          console.log(result)
          this.setState({
            loading: false,
            id: result.data.id,
            name: result.data.name,
            description: result.data.description,
            url: result.data.url,
            rangeFrom: result.data.rangeFrom,
            rangeTo: result.data.rangeTo
          })
        }
        )
        .catch((err) =>
          this.setState({ loading: false, error: err.response }));
    }
  }



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
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
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
                              onChange: this.handleChange.bind(this),
                              pattern: "^[a-zA-Z]{2,40}$",
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
                          <FormControl componentClass="textarea" value={this.state.description} name = "description" onChange = {this.handleChange.bind(this)}/>
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
                              onChange: this.handleChange.bind(this),
                              pattern: "\d{4}",
                            },
                            {
                              label: "TO",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "TO",
                              defaultValue: this.state.rangeTo,
                              name: "rangeTo",
                              onChange: this.handleChange.bind(this),
                              pattern: "\d{4}",
                            }
                          ]
                          }
                        />
                        <Button bsStyle="info" pullRight fill onClick={this.saveBtn}>
                          Update
                    </Button>
                        <Modal
                          show={this.state.show}
                          onHide={this.handleCloseModal}
                          container={this}
                          aria-labelledby="contained-modal-title"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                              Success
                                </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Successfully updated
                              </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseModal}>Close</Button>
                          </Modal.Footer>
                        </Modal>
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
