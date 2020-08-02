import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  Button
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner";


const thArray = ["#","Vendor Name", "Email", "Phone", "Customer Service Contact No", "Status"];
const tdArray = [
  {
    "id": 1,
    "image": "https://i.pinimg.com/originals/c3/af/ba/c3afba827e7299415cb7034e00bc9533.jpg",
    "email": "tamir@rolex.com",
    "status": "Active",
    "vendorName": "Rolex",
    "phone": "8888888888",
    "custServContactNo": "9999999999",
    "vendorContactNo": "7777777777",
    "description": "Best known watch company",
    "address": {
        "street": "kjdshfask",
        "city": "New York",
        "state": "New York",
        "zip": "23141552"
    }
  },
  {
      "id": 2,
      "image": "https://i.pinimg.com/originals/c3/af/ba/c3afba827e7299415cb7034e00bc9533.jpg",
      "email": "tamir@rolex.com",
      "status": "Active",
      "vendorName": "Rolex",
      "phone": "8888888888",
      "custServContactNo": "9999999999",
      "vendorContactNo": "7777777777",
      "description": "Best known watch company",
      "address": {
          "street": "kjdshfask",
          "city": "New York",
          "state": "New York",
          "zip": "23141552"
      }
  }
];


class Vendors extends Component {

  state = {
    vendors: [],
    error: null,
    loading: false,
  }

  componentDidMount = () => {

    // this.setState({ loading: true });
    //   axios
    //     .get("http://localhost:4000/employees")
    //     .then((result) =>{

    //       console.log("hello") 
    //       this.setState({ vendors : result.data })
    //       this.setState({ loading: false})

    //     }
    //     )
    //     .catch((err) => this.setState({ loading: false, error: err.response }));

    this.setState({ vendors: tdArray });

  }

  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Customers List"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <Table striped hover>
                        <thead>
                          <tr>
                            {thArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.vendors.map(props => {
                            return (
                              <tr>
                                <td><Link to={`/admin/vendors/${props.id}`}>{props.id}</Link></td>
                                <td>{props.vendorName}</td>
                                <td>{props.email}</td>
                                <td>{props.phone}</td>
                                <td>{props.custServContactNo}</td>
                                <td>{props.status}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    }
                  />
                </Col>


              </Row>
              <Button>
                <Link to={`/admin/vendors/0`}>
                  Add Vendor
                </Link>
              </Button>

            </Grid>
          )}
      </div>
    );
  }
}

export default Vendors;
