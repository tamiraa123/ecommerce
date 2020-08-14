import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { Link } from "react-router-dom";
import server from "../../server.json";
import axios from "axios";

const thArray = ["#", "Subject", "Start Date", "Due Date", "End Date", "Status"];
class Products extends Component {

state={
  requirements:[],
}

componentDidMount = async () => {

  this.setState({ loading: true });
  await axios
    .get(`${server.url}/requirements/vendor/${localStorage.getItem("userId")}`, {
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


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Requirement List"
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
                                <td><Link to={`/admin/myRequirements/${props.id}`}>{props.id}</Link></td>
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
        <Button>
          <Link to={`/admin/myRequirements/new`}>
            Claim a Requirement 
          </Link>
        </Button>

      </div>
    );
  }
}

export default Products;
