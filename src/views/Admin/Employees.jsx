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

const thArray = ["#", "Email", "First Name", "Last Name", "Role", "Status"];
//Example data



class Employees extends Component {

  state = {
    employees: [],
    error: null,
    loading: false,
  }

  componentDidMount = async () => {

    this.setState({ loading: true });
    await axios
      .get(server.url + "/employees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        console.log(result.data);
        this.setState({ employees: result.data })
        this.setState({ loading: false })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));

    //Setting example data
    //this.setState({ employees: tdArray });
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
                    title="Employee List"
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
                          {this.state.employees.map(props => {
                            return (
                              <tr>
                                <td><Link to={`/admin/employees/${props.employeeId}`}>{props.employeeId}</Link></td>
                                <td>{props.username}</td>
                                <td>{props.firstName}</td>
                                <td>{props.lastName}</td>
                                <td>{props.role}</td>
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
                <Link to={`/admin/employees/0`}>
                  Add Employee
            </Link>
              </Button>
            </Grid>
          )}
      </div>
    );
  }
}

export default Employees;
