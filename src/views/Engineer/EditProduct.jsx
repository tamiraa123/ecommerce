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
import server from "../../server.json";


//Example data
const specData = [
  { specName: "CPU" },
  { specName: "RAM" },
  { specName: "HDD" },
];

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      rows: [],
      id: 0,
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      images: [],
      status: "",
      // productDetails: [],
      category: "",
      error: null,
      loading: false,
      imageGlobal: [],
      show: false,
    }
  }
  handleChangeID = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      // specID: value,
      specName: this.state.rows[idx].specName,
      specValue: this.state.rows[idx].specValue
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
      // specID: this.state.rows[idx].specID,
      specName: value,
      specValue: ""
    };
    console.log(rows);
    this.setState({
      rows
    });
  };

  handleAddRow = () => {
    const item = {
      // specID: "",
      specName: "",
      specValue: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    }, console.log(this.state.row));

  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }

  //Save Profile
  saveBtn = async () => {
    this.setState({ loading: true });
    await axios
      .put(
        server.url + "/products/update/" + this.props.match.params.id,
        {
          productId: this.state.productId,
          productName: this.state.productName,
          description: this.state.description,
          price: this.state.price,
          vendorId: this.state.vendorId,
          manufacturer: this.state.manufacturer,
          categoryName: this.state.categoryName,
          categoryId: this.state.categoryId,
          imageList: this.state.imageList,
          currentQuantity: this.state.currentQuantity,
          productDetails: this.state.rows,
          status: this.state.status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        },
      )
      .then((result) => {
        this.setState({
          loading: false,
          productId: result.data.productId,
          rows: (result.data.productDetails) ? result.data.productDetails : [],
          imageList: result.data.imageList,
          productName: result.data.productName,
          manufacturer: result.data.manufacturer,
          price: result.data.price,
          currentQuantity: result.data.currentQuantity,
          status: result.data.status,
          description: result.data.description,
          categoryName: result.data.categoryName,
          vendorId:result.data.vendorId
        })
        alert("Successful")
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        console.log(err);
      }
      );
  }
  componentDidMount = async () => {

    this.setState({ loading: true });
    await axios
      .get(server.url + "/products/" + this.props.match.params.id
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
          productId: result.data.productId,
          rows: (result.data.productDetails) ? result.data.productDetails : [],
          imageList: result.data.imageList,
          productName: result.data.productName,
          manufacturer: result.data.manufacturer,
          price: result.data.price,
          currentQuantity: result.data.currentQuantity,
          status: result.data.status,
          description: result.data.description,
          categoryName: result.data.categoryName,
          vendorId:result.data.vendorId
        })

      }
      )
      .catch((err) =>
        this.setState({ loading: false, error: err.response }));

    //  this.setState({ rows: specData })
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
                    <th className="text-center"> Specification Name </th>
                    <th />
                  </tr>
                </thead>
                {this.state.rows ? (
                  <tbody>
                    {this.state.rows.map((item, idx) => (
                      <tr id="addr0" key={idx}>
                        <td>{idx}</td>

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
                ) : <tbody>
                    <tr id="addr0">

                    </tr>
                  </tbody>}
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Specification
              </button>

              <Row md={12}>
                <Button bsStyle="info" pullRight fill onClick={this.saveBtn}>
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
