import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Spinner from "../../Spinner";


import firebase from '../../firebase';



class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        file : null

    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
   
  }

//Text Input event
  handleChange = (files) => {
        this.setState({
            files : files
        })    
  }
  handleSave = ()=>{

      let bucketName = 'images'
      let file = this.state.files[0]
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
      let uploadTask = storageRef.put(file)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
            let downloadURL = uploadTask.snapshot.downloadURL
        }
        )
  }
  showImage = ()=>{
      let storageRef = firebase.storage().ref()
      let spaceRef = storageRef.child(`images/`+this.state.files[0].name)
      storageRef.child(`images/`+this.state.files[0].name).getDownloadURL().then((url)=>{
          document.getElementById('new-img').src = url
      })
  }


  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
            ) : (
            <Grid fluid>
                    <input type="file" onChange={(e)=> {this.handleChange(e.target.files)}} />
                    <button onClick={this.handleSave}>Save</button>
                    <button onClick={this.showImage}>Show Image</button>
                    <img id="new-img"/>

            </Grid>
          )}
      </div>
    );
  }
}

export default Test;
