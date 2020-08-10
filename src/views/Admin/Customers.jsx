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


const thArray = ["#", "Email", "First Name", "LastName", "Phone", "State", "City", "Status"];


class Customers extends Component {

  state = {
    customers: [],
    error: null,
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    await axios
      .get(server.url + "/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        console.log(result.data);
        this.setState({ customers: result.data })
        this.setState({ loading: false })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));
    //  console.log(this.state.customers);

    //Setting example data


   // this.setState({ customers: tdArray });
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
                          {this.state.customers.map(props => {
                            return (
                              <tr>
                                <td><Link to={`/admin/customers/${props.customerId}`}>{props.customerId}</Link></td>
                                <td>{props.username}</td>
                                <td>{props.firstName}</td>
                                <td>{props.lastName}</td>
                                <td>{props.phone}</td>
                                <td>{this.state.state == null ? "" : this.state.address.state}</td>
                                <td>{this.state.city == null ? "" : this.state.address.city}</td>
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

export default Customers;
