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
import server from "../../server.json";

//Example data
const thArray = ["#", "Vendor Name", "Email", "Phone", "Customer Service Contact No", "Status"];


class Vendors extends Component {

  state = {
    vendors: [],
    error: null,
    loading: false,
  }

  componentDidMount = async () => {
    //Reading list of vendors
    this.setState({ loading: true });
    await axios
      .get(server.url + "/vendors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        this.setState({ vendors: result.data })
        this.setState({ loading: false })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));
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
                    title="Vendor List"
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
                                <td><Link to={`/admin/vendors/${props.vendorId}`}>{props.vendorId}</Link></td>
                                <td>{props.vendorName}</td>
                                <td>{props.username}</td>
                                <td>{props.phone}</td>
                                <td>{props.contactMethod}</td>
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

            </Grid>
          )}
      </div>
    );
  }
}

export default Vendors;
