import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Alert,
  Modal
} from "react-bootstrap";
import TreeMenu from 'react-simple-tree-menu';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';


import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import axios from "axios";
import Spinner from "../../Spinner";
import server from "../../server.json";




//Send ->  add id = parentid, value  &   edit = id, value,  &  delete = id 

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [{
        key: '',
        label: '',
        nodes: []
      }],
      selected: '',
      selectedValue: '',
      catName: '',
      error: null,
      loading: false,
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleChangeTree = this.handleChangeTree.bind(this);
  }

  addBtn = async () => {
    if (this.state.selected) {
      var pieces = this.state.selected.split('/');
      var send = pieces[pieces.length - 1];
      // console.log(send);
      await axios
        .post(server.url + "/categories/add", {
          parentId: send,
          value: this.state.catName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },)
        .then((result) => {
          this.setState({show:true, category: result.data });
        })
        .catch((err) =>
          this.setState({ error: err })
        );
    }
    else {
      this.setState({ error: "Please select category" })
    }
  }
  editBtn = async () => {
    if (this.state.selected) {
      var pieces = this.state.selected.split('/');
      var send = pieces[pieces.length - 1];
      console.log(this.state.catName);
      await axios
        .put(server.url + "/categories/edit", {
          categoryId: send,
          value: this.state.catName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
        )
        .then((result) => {
          console.log(result)
          this.setState({show:true, category: result.data });
        })
        .catch((err) =>
          this.setState({ error: err })
        );
    }
    else {
      this.setState({ error: "Please select category" })
    }
  }
  deleteBtn = async () => {
    if (this.state.selected) {
      var pieces = this.state.selected.split('/');
      var categoryId = pieces[pieces.length - 1];
      await axios
        .delete(server.url + "/categories/delete/" +  categoryId,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then((result) => {
           this.setState({show:true, category: result.data });
        })
        .catch((err) =>
          this.setState({ error: err })
        );
    }
    else {
      this.setState({ error: "Please select category" })
    }
  }
  handleCloseModal = () => {
    this.setState({ show: false });
  }

  //Selected items
  handleChangeTree = async (event) => {
    // console.log(event)
    this.setState({ selected: event.key, catName: event.label })
    this.setState({ selectedValue: event.label });
    this.setState({ error: null });

  }

  componentDidMount = async () => {

    this.setState({ loading: true });
    await axios
      .get(server.url + "/categories"
        , {headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },}
      )
      .then((result) => {
        this.setState({ category: result.data, loading: false })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));
  }



  //Text input event
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: null })
    // console.log(this.state.catName);
  }


  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
            <Grid fluid>
              <Row>
                <Col md={8}>

                  <Card
                    title="Category"
                    content={
                      <form>
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        {this.state.error && (
                          <Alert bsStyle="danger">
                            {this.state.error}
                          </Alert>
                        )}
                        <Alert bsStyle="warning">
                          <strong>Add: </strong> select category that needs sub category. Then edit value<br />
                          <strong>Edit: </strong> select category that needs edit category. Then edit value<br />
                          <strong>Delete: </strong> select category that needs sub category. Then edit value
                          </Alert>
                        <TreeMenu onClickItem={this.handleChangeTree}
                          data={this.state.category}>
                        </TreeMenu>
                        <label>Selected <b>{this.state.selectedValue}</b></label>
                        <FormInputs
                          ncols={["col-md-4"]}
                          properties={[
                            {
                              label: "Category Name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Category Name",

                              value: this.state.catName,
                              name: "catName",
                              onChange: this.handleChange.bind(this)
                            },

                          ]
                          }
                        />

                        <br />
                        <div className="clearfix" />
                        <Button bsStyle="info" pullLeft fill onClick={this.addBtn}>Add</Button>&nbsp;
                        <Button bsStyle="info" pullLeft fill onClick={this.editBtn}>Edit</Button>&nbsp;
                        <Button bsStyle="info" pullLeft fill onClick={this.deleteBtn}>Delete</Button>
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
