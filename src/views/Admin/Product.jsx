import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Label,
  Carousel,
  DropdownButton,
  MenuItem,
  Modal,
  Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-switch";
import axios from "axios";

import Spinner from "../../Spinner";
import firebase from '../../firebase';
import server from "../../server.json";
import iconproduct from '../../assets/img/iconproduct.png'



let map = new Map([
  ["NEW", "0"],
  ["ACTIVE", "1"],
  ["DOWNLOADED", "2"],
])

const stats = [
  { id: "0", name: "NEW" },
  { id: "1", name: "ACTIVE" },
  { id: "2", name: "DOWNLOADED" }
];

const styleCarousel = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};



class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      images: [],
      status: stats[0].id,
      productDetails: [],
      category: "",
      error: null,
      loading: false,
      imageGlobal: [iconproduct],
      show: false,
    }
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }
  //Save Status of Product
  saveBtn = async () => {
    this.setState({ loading: true });
    await axios
      .put(
        server.urlHenok + "/products/updatestatus/" + this.props.match.params.id,
        {
          status: this.state.status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
      )
      .then((result) => {
        // console.log(result)
        this.setState({
          loading: false,show: true,
          status: result.data,
        })
      }
      )
      .catch((err) => {
        this.setState({ loading: false, error: err.response })
        // console.log(err);
      }
      );
    //....
  }
  //Assign to event
  handleChangeStatus(event) {
    console.log(stats.filter(eng => eng.id == this.state.status).map(person => person.name));
    this.setState({ status: event });
  }

  handleCloseModal = () => {
    this.setState({ show: false });
  }

  componentDidMount = async () => {

    this.setState({ loading: true });
    await axios
      .get(server.urlHenok + "/products/" + this.props.match.params.id
        , {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },}
      )
      .then((result) => {
         console.log(result)
        this.setState({
          loading: false,
          id: result.data.productId,
          productDetails: result.data.productDetails,
          images: result.data.imageList,
          name: result.data.productName,
          brand: result.data.manufacturer,
          price: result.data.price,
          quantity: result.data.currentQuantity,
          status: map.get(result.data.status),
          description: result.data.description,
          category: result.data.categoryName,
        })

      }
      )
      .catch((err) =>
        this.setState({ loading: false, error: err.response }));
      
        
    //show image
    //  show picture
    if (this.state.images) {
      
      let storageRef1 = firebase.storage().ref()
      let tempTable = [this.state.images.length];
      for (let i = 0; i < this.state.images.length; i++) {
        tempTable[i] = (await storageRef1.child(this.state.images[i]).getDownloadURL());
      }
     // console.log(tempTable);
      this.setState({
        imageGlobal: tempTable
      }, console.log(tempTable));
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
                <Col md={9}>
                  <Card
                    title="Product"
                    content={
                      <form>
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        <Carousel >
                          {this.state.imageGlobal.map((url) => {
                            return (
                              <Carousel.Item >
                                <img style={styleCarousel} width={300} height={400} src={url} />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>

                        <h2>{this.state.name}</h2>
                        <p>
                          <Row className="show-grid">
                            <Col xs={4} md={6}>
                              <Label>Price: </Label> &nbsp; {this.state.price}
                            </Col>
                            <Col xs={4} md={6}>
                              <Label>Category: </Label>&nbsp; {this.state.category}
                            </Col>
                          </Row>
                          <Row className="show-grid">
                            <Col xs={4} md={6}>
                              <Label>Brand: </Label>&nbsp; {this.state.brand}
                            </Col>
                            <Col xs={4} md={6}>
                              <Label>Quantity: </Label>&nbsp; {this.state.quantity}
                            </Col>

                          </Row>
                          <Row className="show-grid">
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Description</ControlLabel>
                              <FormControl componentClass="textarea" value={this.state.description} disabled={true} />
                            </FormGroup>
                          </Row>
                        </p>


                        <label>

                          <ControlLabel>STATUS</ControlLabel><br />
                          <DropdownButton
                            title={stats.filter(eng => eng.id == this.state.status).map(person => person.name)}
                            id="document-type"
                            onSelect={this.handleChangeStatus}
                          >
                            {stats.map((opt) => (
                              <MenuItem key={opt.id} eventKey={opt.id}>
                                {opt.name}
                              </MenuItem>
                            ))}
                          </DropdownButton>
                        </label>
                        {this.state.productDetails == null ? (<div><i>No specification</i></div>) : (
                          <Table striped hover>
                            <thead>
                              <tr>
                                <th>Specification</th>
                                <th>Specification Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.productDetails.map((prop, key) => {
                                return (
                                  <tr key={key}>
                                    <td> {prop.specName} </td>
                                    <td> {prop.specValue} </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        )}
                        <Button bsStyle="info" pullRight fill onClick={this.saveBtn}>
                          Update
                        </Button>
                        <Modal
                          show={this.state.show}
                          onHide={this.handleCloseModal}
                          container={this}
                          aria-labelledby="contained-modal-title"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                              Success
                                </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Successfully updated
                              </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseModal}>Close</Button>
                          </Modal.Footer>
                        </Modal>
                        <div className="clearfix" />
                      </form>
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

export default Product;
