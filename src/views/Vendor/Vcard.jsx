import React, { Component } from "react";

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import 'filepond/dist/filepond.min.css';
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


class Vcard extends Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      provider : "",
      fullname : "",
      expDate : "",
      cnum : ""
    }
  }
  handleSavebtn= () => {
    //save action
   this.props.history.goBack();
  }

  handleChange(event) {
    const { target: { name, value } } = event
    this.setState({ [name]: value, event: event })
  }

  componentDidMount() {
    this.setState({provider : "Amex"});
    this.setState({fullname : "Munkhzorig"});
    this.setState({expDate : "20200202"});
    this.setState({cnum : "213123123"});
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card
                title="Card"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "Financial Service Provider",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Financial Service Provider",
                          defaultValue: this.state.provider,
                          name: "provider",
                          disabled: true,
                          onChange: this.handleChange.bind(this)
                        },

                        {
                          label: "CNumber",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "CNumber",
                          defaultValue: this.state.cnum,
                          name: "cnum",
                          onChange: this.handleChange.bind(this)
                        },

                        {
                          label: "Card Holder's Full Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Card Holder's Full Name",
                          defaultValue: this.state.fullname,
                          name: "fullname",
                          onChange: this.handleChange.bind(this)
                        },
                        {
                          label: "Expiration date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Expiration date",
                          defaultValue: this.state.expDate,
                          name: "expDate",
                          onChange: this.handleChange.bind(this)
                        },
                      ]
                      }
                    />
                    <Button bsStyle="info" pullRight fill onClick={this.handleSavebtn}>
                      Done
                    </Button>
                    <div className="clearfix" />
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

export default Vcard;
