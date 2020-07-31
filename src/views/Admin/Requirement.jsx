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
  Table,
  Media,
  Label,
  Carousel, Image
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import Switch from "react-switch";
import { DiagnosticCategory } from "typescript";


const engineers = [
  { id: 1, name: "Tamir" },
  { id: 2, name: "Munkhzorig" },
  { id: 3, name: "Enkhbayar" },
];
const statusD = ["NEW", "ACTIVE", "BLOCKED"];

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      subject: "Add Product",
      startDate: "",
      dueDate: "",
      endDate: "",
      status: statusD[0],
      description: [],
      assignTo: engineers[0].id,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeAssignTo = this.handleChangeAssignTo.bind(this);
  }

  componentDidMount() {

  }
  handleChangeStatus(event) {
    this.setState({ status: statusD[event] });
  }
  handleChangeAssignTo(event) {
    console.log(engineers.filter(eng => eng.id == this.state.assignTo).map(person => person.name));
    this.setState({ assignTo: event });
  }
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Requirement"
                content={
                  <form>
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
                      ncols={["col-md-3", "col-md-3", "col-md-3"]}
                      onChange={this.handleChange}
                      properties={[
                        {
                          label: "Start Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Start Date",
                          defaultValue: this.state.startDate,
                          name: "startDate",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "End Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "End Date",
                          defaultValue: this.state.endDate,
                          name: "endDate",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Due Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Start Date",
                          defaultValue: this.state.dueDate,
                          name: "DueDate",
                          onChange: this.handleChange.bind(this)
                        },

                      ]}
                    />
                    <Row>
                      <Col xs={6} md={4}>
                        <ControlLabel>ASSIGN TO</ControlLabel><br />
                        <DropdownButton
                          title={engineers.filter(eng => eng.id == this.state.assignTo).map(person => person.name)}
                          id="document-type"
                          onSelect={this.handleChangeAssignTo}
                        >
                          {engineers.map((opt) => (
                            <MenuItem key={opt.id} eventKey={opt.id}>
                              {opt.name}
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

export default Product;
