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


const thArray = ["#", "Bank Name", "Description", "URL", "RangeFrom", "RangeTo"];

class Payments extends Component {
  state = {
    payments: [],
    error: null,
    loading: false,
  }

  componentDidMount =async () => {

    this.setState({ loading: true });
    await axios
      .get(server.url + "/card/allpaymentmethod"
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
      )
      .then((result) => {
        console.log(result.data);
        this.setState({ payments: result.data })
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
                    title="Payment Method"
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
                          {this.state.payments.map(props => {
                            return (
                              <tr>
                                <td><Link to={`/admin/payments/${props.id}`}>{props.id}</Link></td>
                                <td>{props.name}</td>
                                <td>{props.description}</td>
                                <td>{props.url}</td>
                                <td>{props.rangeFrom}</td>
                                <td>{props.rangeTo}</td>
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
                <Link to={`/admin/payments/0`}>
                  Add Bank
          </Link>
              </Button>
            </Grid>
          )}
      </div>
    );
  }
}

export default Payments;
