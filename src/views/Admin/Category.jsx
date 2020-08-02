import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
  Table,
  Media,
  Label,
  Carousel,Image
} from "react-bootstrap";
import TreeMenu from 'react-simple-tree-menu';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';


import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import Switch from "react-switch";
import { DiagnosticCategory } from "typescript";


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
//add hiihdee parentid, value   edit = id, value,   delete = id yavuulnaa

class Product extends Component {
  constructor(props){
    super(props);
    
    this.state={
        category:[{
          key: '',
          label: '',
          nodes:[]
        }],
        selected:''
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleChangeTree = this.handleChangeTree.bind(this);
  }

  componentDidMount(){
    this.setState({category: treeData}); 
    this.setState({selected: this.state.category[0].key});
    //this.state.setState({value : ""});
   // console.log(this.state.category[0].key);
  }


  handleChangeTree(event) {
    this.state.selected = event.key;
    this.setState({value: event.label});
  }

  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
    console.log(this.state.value);
  }
  

  render() {
    return (
      <div className="content">
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
                  
                      <FormInputs
                        ncols={["col-md-4"]} 
                        properties={[
                          {
                            label: "Category Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Category Name",
                            defaultValue: this.state.value,
                            name:"value",
                            onChange:this.handleChange.bind(this)   
                          },
                          
                        ]
                      }
                      />
                  
                      <br/>
                    <div className="clearfix" />
                    <Button bsStyle="info" pullLeft fill type="submit">Add</Button>&nbsp;
                    <Button bsStyle="info" pullLeft fill type="submit">Edit</Button>&nbsp;
                    <Button bsStyle="info" pullLeft fill type="submit">Delete</Button>
                  </form>
                }
              />
            </Col>
  
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Product;
