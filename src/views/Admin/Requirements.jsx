import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner";
import server from "../../server.json";

//Example data
const thArray = ["#", "Subject", "Start Date", "Due Date", "End Date" ,"Status"];



class Requirements extends Component {

  state = {
    requirements: [],
    error: null,
    loading: false,
  }

  componentDidMount = async () => {
    if (localStorage.getItem('role') == "ROLE_ENGINEER") {
      await axios
        .get(server.url + "/requirements/engineer/" + localStorage.getItem('userId')
          , {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        )
        .then((result) => {
          console.log(result)
          console.log(result.data);
          this.setState({ requirements: result.data })
          this.setState({ loading: false })
        }
        )
        .catch((err) =>
          this.setState({ loading: false, error: err.response }));
    }
    else {
      this.setState({ loading: true });
      await axios
        .get(server.url + "/requirements", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then((result) => {
          console.log(result.data);
          this.setState({ requirements: result.data })
          this.setState({ loading: false })
        }
        )
        .catch((err) => this.setState({ loading: false, error: err.response }));
    }
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
                    title="Requirement"
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
                          {this.state.requirements.map(props => {
                            return (
                              <tr>
                                <td><Link to={`/admin/requirements/${props.id}`}>{props.id}</Link></td>
                                <td>{props.subject}</td>
                                <td>{props.createdDate}</td>
                                <td>{props.dueDate}</td>
                                <td>{props.endedDate}</td>
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

export default Requirements;
