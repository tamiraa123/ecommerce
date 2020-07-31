import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";


const thArray = ["ID", "subject", "Start Date", "Due Date", "End Date","Status"];
const tdArray = [
  ["1", "Add Specification", "Aug-10, 2020", "Aug-15, 2020", "Aug-15, 2020", "New"],
  ["2", "Delete Specification", "Aug-10, 2020", "Aug-15, 2020", "Aug-15, 2020", "Done"],  
];


class Requirements extends Component {

state={
  requirements:[],
}

componentDidMount = () =>{

  // axios
  //   .get("")
  //   .then((result) => 
    this.setState({requirements:tdArray});
  //)
  //   .catch((err) => console.log(err.response));

}

  render() {
    return (
      <div className="content">
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
                      {this.state.requirements.map((prop, key) => {
                        return (
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>
                                      {(key == 0) && <Link to={`/admin/requirements/${prop}`}>
                                          {prop}
                                      </Link>}
                                      {(key != 0) && <p>{prop}</p>}
                                  </td>;
                              })}
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
          <Link to={`/admin/requirements/0`}>
            Add Bank 
          </Link>
        </Button>

      </div>
    );
  }
}

export default Requirements;
