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
import server from "../../server.json";
import axios from "axios";

let map = new Map()
map.set("CREATED", 0)
map.set("RECEIVED", 1)
map.set("ONGOING", 2)
map.set("ANSWERED", 3)
map.set("CLOSED", 4)
map.set("DELETED", 5)

let d = new Date();
let date = d.toString();
class Product extends Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      reqNo: null,
      reqStatus: "",
      reqDesc: "",
      assignedTo: null,
      createdDate: null,
      startDate: null,
      finishDate: null,
      closeDate: null,
      reqName: "",
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
    console.log(map.get(this.state.reqStatus), this.state)
  }

  componentDidMount = async () => {
    if (this.props.match.params.id != "new") {
      this.setState({ loading: true });
      await axios
        .get(server.url + "/requirements/" + this.props.match.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then((result) => {
          console.log(result);
          this.setState({
            reqNo: result.data.id,
            reqStatus: result.data.status,
            reqDesc: result.data.description,
            assignedTo: result.data.engineer,
            createdDate: result.data.createdDate,
            startDate: result.data.createdDate,
            finishDate: result.data.endedDate,
            closeDate: result.data.dueDate,
            reqName: result.data.subject,
          }, () => console.log(this.state))
          this.setState({ loading: false })
        }
        )
        .catch((err) => this.setState({ loading: false, error: err.response }));
    }
    else {
      this.setState({
        reqNo: "Will be provided soon",
        reqStatus: "CREATED",
        createdDate: date
      });
    }
  }

  handleDoneBtn = async (event) => {
    if (this.props.match.params.id == "new") {
      console.log(server.url + "/requirements");
      await axios
        .post(
          server.url + "/requirements",
          {
            vendorId: localStorage.getItem("userId"),
            subject: this.state.reqName,
            lastModifiedDate: null,
            dueDate: null,
            endedDate: null,
            status: 0,
            description: this.state.reqDesc,
            engineer: this.state.assignedTo,
            comments: null
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
    else {
      await axios
        .put(
          server.url + "/requirements/" + this.props.match.params.id,
          {
            id: this.state.reqNo,
            vendorId: localStorage.getItem("userId"),
            status: map.get(this.state.reqStatus),
            description: this.state.reqDesc,
            engineer: this.state.assignedTo,
            lastModifiedDate: this.state.lastModifiedDate,
            endedDate: this.state.endedDate,
            dueDate: this.state.dueDate,
            subject: this.state.reqName,
            comment: ""
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
                          disabled: true
                        },

                        {
                          label: "Requirement Status",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Requirement Status",
                          defaultValue: this.state.reqStatus,
                          name: "reqStatus",
                          disabled: true,
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
                      <ControlLabel>Description</ControlLabel>
                      <FormControl name="reqDesc" onChange={this.handleChange.bind(this)} componentClass="textarea" value={this.state.reqDesc} />
                    </FormGroup>

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

export default Product;
