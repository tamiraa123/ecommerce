import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Label,
  Carousel
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-switch";
import axios from "axios";
import Spinner from "../../Spinner";
import firebase from '../../firebase';


//Example data
const specData = [
  { specID: "1", specName: "CPU" },
  { specID: "2", specName: "RAM" },
  { specID: "3", specName: "HDD" },
];

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      rows: []
    }
  }
  handleChangeID = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      specID: value,
      specName: this.state.rows[idx].specName
    };
    console.log(rows);
    this.setState({
      rows
    });
  };
  handleChangeName = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      specID: this.state.rows[idx].specID,
      specName: value
    };
    console.log(rows);
    this.setState({
      rows
    });
  };

  handleAddRow = () => {
    const item = {
      specID: "",
      specName: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }

    //Save Profile
    saveBtn = () => {
        console.log("saveBtn()");
        console.log(this.state.rows);
    }
  componentDidMount =()=>{
    this.setState({rows:specData})
  }

  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
            <Grid fluid>
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Unique ID </th>
                    <th className="text-center"> Specification Name </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td style={{width:"20%"}}>
                        <input
                          type="text"
                          name="specID"
                          value={this.state.rows[idx].specID}
                          onChange={this.handleChangeID(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="specName"
                          value={this.state.rows[idx].specName}
                          onChange={this.handleChangeName(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Specification
              </button>
             
              <Row md={12}>
              <Button bsStyle="info" pullRight fill type="submit" onClick={this.saveBtn}>
                          Update
              </Button>
              </Row>

            </Grid>
          )}
      </div>
    );
  }
}

export default EditProduct;
