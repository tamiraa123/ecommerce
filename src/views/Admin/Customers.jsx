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


const thArray = ["#", "Email", "First Name", "LastName", "Phone", "State", "City", "isActive"];
//Example data
const tdArray = [
  {
        "id": 1,
        "image": "https://www.vocalcom.com/wp-content/uploads/the-role-of-emotions-in-the-customer-experience.jpg",
        "email": "tamir.baldandorj@gmail.com",
        "status": "Active",
        "firstName": "Tamir",
        "lastName": "Baldandorj",
        "phone": "6419181115",
        "address": {
            "street": "asdfasdf",
            "city": "Fairfield",
            "state": "Iowa",
            "zip": 52556
        },
        "totalScore": 100000
    },
    {
        "id": 2,
        "image": "https://www.vocalcom.com/wp-content/uploads/the-role-of-emotions-in-the-customer-experience.jpg",
        "email": "tamir.baldandorj@gmail.com",
        "status": "Active",
        "firstName": "Tamir",
        "lastName": "Baldandorj",
        "phone": "6419181115",
        "address": {
            "street": "asdfasdf",
            "city": "Fairfield",
            "state": "Iowa",
            "zip": 52556
        },
        "totalScore": 130000
    }
];


class Customers extends Component {

  state = {
    customers: [],
    error: null,
    loading: false,
  }

  componentDidMount = () => {
    // this.setState({ loading: true });
    // axios
    //   .get("http://localhost:4000/employees")
    //   .then((result) => {

    //     console.log("hello")
    //     this.setState({ customers: result.data })
    //     this.setState({ loading: false })
    //   }
    //   )
    //   .catch((err) => this.setState({ loading: false, error: err.response }));
    //Setting example data
     this.setState({ customers: tdArray });
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
                                <td><Link to={`/admin/customers/${props.id}`}>{props.id}</Link></td>
                                <td>{props.email}</td>
                                <td>{props.firstName}</td>
                                <td>{props.lastName}</td>
                                <td>{props.phone}</td>
                                <td>{props.address.state}</td>
                                <td>{props.address.city}</td>
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
