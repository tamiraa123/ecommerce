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
  Alert,
  Modal
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";
import server from "../../server.json";

//Example data
// const engineers = [
//   { id: 1, name: "Tamir" },
//   { id: 2, name: "Munkhzorig" },
//   { id: 3, name: "Enkhbayar" },
// ];
const statusD = ["CREATED", "RECEIVED", "ONGOING", "ANSWERED", "CLOSED", "DELETED"];

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      subject: "",
      startDate: "", //createdDate
      dueDate: "",
      endDate: "",
      status: statusD[0],
      description: "",
      // assignTo: engineers[0].id,
      engineers: [],
      vendorId: "",
      lastModifiedDate: "",

      error: null,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeAssignTo = this.handleChangeAssignTo.bind(this);
  }
  handleCloseModal = () => {
    this.setState({ show: false });
  }
  //Save Status of Product
  saveBtn = async () => {
    this.setState({ loading: true });
    await axios
      .put(
        server.url + "/requirements/" + this.props.match.params.id,
        {
          id: this.state.id,
          vendorId: this.state.vendorId,
          subject: this.state.subject,
          createdDate: this.state.startDate,
          dueDate: this.state.dueDate,
          endedDate: this.state.endDate,
          status: this.state.status,
          description: this.state.description,
          engineer: this.state.assignTo,
          lastModifiedDate: this.state.lastModifiedDate,

        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
      )
      .then((result) => {
        // console.log(result)
        this.setState({
          loading: false, show: true,
          id: result.data.id,
          subject: result.data.subject,
          startDate: result.data.createdDate,
          dueDate: result.data.dueDate,
          endDate: result.data.endedDate,
          status: result.data.status,
          description: result.data.description,
          assignTo: result.data.engineer,
          lastModifiedDate: result.data.lastModifiedDate,
          vendorId: result.data.vendorId
        })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        // console.log(err);
      }
      );
    //....
  }
  //Status event
  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
    console.log(this.state.status);
  }
  //Assign to event
  handleChangeAssignTo(event) {
    //console.log(this.state.engineers.filter(eng => eng.id == this.state.assignTo).map(person => person.name));

    this.setState({ assignTo: event });
  }
  //Text input events
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  componentDidMount = async () => {
    this.setState({ loading: true });

    //Set engineers
    await axios
      .get(server.url + "/employees/engineers"
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      )
      .then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          engineers: result.data
        })

      }
      )
      .catch((err) =>
        this.setState({ loading: false, error: err.response }));

    await axios
      .get(server.url + "/requirements/" + this.props.match.params.id
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      )
      .then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          id: result.data.id,
          subject: result.data.subject,
          startDate: result.data.createdDate,
          dueDate: result.data.dueDate,
          endDate: result.data.endedDate,
          status: result.data.status,
          description: result.data.description,
          assignTo: result.data.engineer,
          lastModifiedDate: result.data.lastModifiedDate,
          vendorId: result.data.vendorId
        })

      }
      )
      .catch((err) =>
        this.setState({ loading: false, error: err.response }));


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
                    title="Requirement"
                    content={
                      <form>
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        <div className="typo-line">
                          <p className="category">Request Id:</p> {this.state.id}
                        </div>
                        <div className="typo-line">
                          <p className="category">Subject:</p> {this.state.subject}
                        </div>

                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Description</ControlLabel>
                          <FormControl componentClass="textarea" value={this.state.description} disabled={true} />
                        </FormGroup>
                        <FormInputs
                          ncols={["col-md-4", "col-md-4", "col-md-4"]}
                          onChange={this.handleChange}
                          properties={[
                            {
                              label: "Start Date",
                              type: "date",
                              bsClass: "form-control",
                              placeholder: "Start Date",
                              defaultValue: this.state.startDate,
                              name: "startDate",
                              onChange: this.handleChange.bind(this),
                              disabled: true
                            },
                            {
                              label: "Due Date",
                              type: "date",
                              bsClass: "form-control",
                              placeholder: "Start Date",
                              defaultValue: this.state.dueDate,
                              name: "dueDate",
                              onChange: this.handleChange.bind(this),
                              disabled: (this.state.status == "CLOSED" || localStorage.getItem('role') == "ROLE_ENGINEER") ? true : false,


                            },
                            {
                              label: "Ended Date",
                              type: "date",
                              bsClass: "form-control",
                              placeholder: "End Date",
                              defaultValue: this.state.endDate,
                              name: "endDate",
                              onChange: this.handleChange.bind(this),
                              disabled: "true"
                            }

                          ]}
                        />
                        <Row>
                          <Col xs={6} md={4}>
                            <ControlLabel>ASSIGN TO</ControlLabel><br />
                            <DropdownButton
                              title={this.state.engineers.filter(eng => eng.personId == this.state.assignTo).map(person => person.firstName)}
                              id="document-type"
                              onSelect={this.handleChangeAssignTo}
                              disabled= {(localStorage.getItem('role') == "ROLE_ENGINEER") ? true : false}
                            >
                              {this.state.engineers.map((opt) => (
                                <MenuItem key={opt.personId} eventKey={opt.personId}>
                                  {opt.firstName}
                                </MenuItem>
                              ))}

                            </DropdownButton>

                          </Col>
                          <Col xs={6} md={4}>
                            <ControlLabel>STATUS</ControlLabel><br />

                            <DropdownButton
                              title={this.state.status}
                              id="document-type"
                              onSelect={this.handleChangeStatus}
                            >
                              {statusD.map((opt, i) => (
                                <MenuItem key={i} eventKey={i}>
                                  {opt}
                                </MenuItem>
                              ))}
                            </DropdownButton>
                          </Col>
                        </Row>
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
