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


const thArray = ["#", "Subject", "Start Date", "Due Date", "End Date", "Status"];
const tdArray = [
  {
    "id": 1,
    "subject": "Add Product",
    "startDate": "2020-08-08",
      "dueDate": "2020-08-18",
      "endDate": "2020-08-18",
    "status": "New",
    "description": "",
    "assignTo": 1
},
{
    "id": 2,
    "subject": "Add Product",
    "startDate": "2020-08-08",
      "dueDate": "2020-08-18",
      "endDate": "2020-08-18",
    "status": "Active",
    "description": "",
    "assignTo": 2
}
];


class Requirements extends Component {

  state = {
    requirements: [],
    error: null,
    loading: false,
  }

  componentDidMount = () => {

    // this.setState({ loading: true });
    //   axios
    //     .get("http://localhost:4000/employees")
    //     .then((result) =>{
    //       console.log(result.data) 
    //       this.setState({ requirements : result.data })
    //       this.setState({ loading: false})
    //     }
    //     )
    //     .catch((err) => this.setState({ loading: false, error: err.response }));

    this.setState({ requirements: tdArray });

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
                                <td>{props.startDate}</td>
                                <td>{props.dueDate}</td>
                                <td>{props.endDate}</td>
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
              {/* <Button>
                <Link to={`/admin/requirements/0`}>
                  Add
                </Link>
              </Button> */}
            </Grid>
          )}

      </div>
    );
  }
}

export default Requirements;
