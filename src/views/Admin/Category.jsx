import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import TreeMenu from 'react-simple-tree-menu';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';


import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import axios from "axios";
import Spinner from "../../Spinner";
import server from "../../server.json";


//Example data
const treeData = [
  {
    key: '1',
    label: 'Electronic',
    nodes: [
      {
        key: '1-1',
        label: 'Laptop',
        nodes: [
          {
            key: '1-1-1',
            label: 'Apple',
            nodes: [] // you can remove the nodes property or leave it as an empty array
          },
        ],
      },
    ],
  },
  {
    key: '2',
    label: 'Watch',
  },
];

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
      value: '',
      error: null,
      loading: false,
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleChangeTree = this.handleChangeTree.bind(this);
  }

  addBtn = async () => {
    if (this.state.selected) {
      await axios
        .post(server.urlHenok + "/categories/add", {
          parentId: this.state.selected,
          value: this.state.value,
        })
        .then((result) => {
          this.setState({ category: result.data });
        })
        .catch((err) =>
          this.setState({ error: "Error" })
        );
    }
    else {
      this.setState({ error: "Please select category" })
    }
  }
  editBtn = async () => {
    if (this.state.selected) {
      await axios
        .put(server.urlHenok + "/categories/edit", {
          categoryId: this.state.selected,
          value: this.state.value,
        })
        .then((result) => {
          this.setState({ category: result.data });
        })
        .catch((err) =>
          this.setState({ error: "Error" })
        );
    }
    else {
      this.setState({ error: "Please select category" })
    }
  }
  deleteBtn = async () => {
    if (this.state.selected) {
      await axios
        .delete(server.urlHenok + "/categories/delete", {
          categoryId: this.state.selected,
        })
        .then((result) => {
          this.setState({ category: result.data });
        })
        .catch((err) =>
          this.setState({ error: "Error" })
        );
    }
    else {
      this.setState({ error: "Please select category" })
    }
  }


  componentDidMount = async () => {

    this.setState({ loading: true });
    await axios
      .get(server.urlHenok + "/categories"
        // , {headers: {
        //       Authorization: `Bearer ${localStorage.getItem('token')}`
        //   },}
      )
      .then((result) => {
        this.setState({ category: result.data, loading: false })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));
  }

  //Selected items
  handleChangeTree(event) {
    this.setState({ selected: event.key })
    this.setState({ value: event.label });
    this.setState({ selectedValue: event.label });

  }

  //Text input event
  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
    console.log(this.state.value);
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
                              defaultValue: this.state.value,
                              name: "value",
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
