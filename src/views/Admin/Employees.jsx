import React, { Component } from "react";
import { Grid, 
  Row, 
  Col, 
  Table, 
  Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner";

const thArray = ["#", "Email", "First Name", "Last Name", "Role","Status"];
const tdArray = [
  {
    "id": 1,
    "image": "https://specials-images.forbesimg.com/imageserve/5d3d7a55f1176b000897d627/960x0.jpg?fit=scale",
    "email": "abc@gmail.com",
    "status": "Active",
    "firstName": "Tamir",
    "lastName": "Baldandorj",
    "phone": "6418191115",
    "street": "aaaaa",
    "city": "Fairfield",
    "state": "Iowa",
    "zip": "525557",
    "role": "Admin"
},
{
    "id": 2,
    "image": "https://specials-images.forbesimg.com/imageserve/5d3d7a55f1176b000897d627/960x0.jpg?fit=scale",
    "email": "abc@gmail.com",
    "status": "Active",
    "firstName": "Munkhzorig",
    "lastName": "Bayartsogt",
    "phone": "6418191120",
    "street": "aaaaa",
    "city": "Fairfield",
    "state": "Iowa",
    "zip": "525557",
    "role": "Admin"
},
{
    "id": 2,
    "image": "https://specials-images.forbesimg.com/imageserve/5d3d7a55f1176b000897d627/960x0.jpg?fit=scale",
    "email": "abc@gmail.com",
    "status": "Active",
    "firstName": "Enkhbayar",
    "lastName": "Batjargal",
    "phone": "6418191274",
    "street": "aaaaa",
    "city": "Fairfield",
    "state": "Iowa",
    "zip": "525557",
    "role": "Admin"
}
];


class Employees extends Component {

state={
  employees:[],
  error: null,
  loading: false,
}

componentDidMount = () =>{

  // this.setState({ loading: true });
  //   axios
  //     .get("http://localhost:4000/employees")
  //     .then((result) =>{ 
  //       this.setState({ employees : result.data })
  //       this.setState({ loading: false})
  //     }
  //     )
  //     .catch((err) => this.setState({ loading: false, error: err.response }));

  this.setState({employees:tdArray});
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
                              <td><Link to={`/admin/employees/${props.id}`}>{props.id}</Link></td>
                              <td>{ props.email }</td>
                              <td>{ props.firstName }</td>
                              <td>{ props.lastName }</td>
                              <td>{ props.role }</td>
                              <td>{ props.status }</td>
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
