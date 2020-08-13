import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import server from "../../server.json";
import axios from "axios";

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
const groupByStatus = groupBy('status');

class Dashboard extends Component {
  state = {
    products: [],
    promos: [],
    requirements: [],
    dataPie : {
      labels: [],
      series: []
    },
    legendPie : {
      names: [],
      types: []
    }
    
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount = async () => {
    let url = server.url + "/products/vendor/" + localStorage.getItem("userId");
    console.log(url);
    axios
      .get(url, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      })
      .then((result) => {
        // console.log("11111111111111111111111");
        console.log(result.data);
        this.setState({ products: result.data });
      })
      .catch((err) =>
        this.setState({ error: "Error" }, console.log(err))//err.response.data.error.message
      );
    await axios
      .get(server.url + "/promotions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        console.log(result.data);
        this.setState({ promos: result.data })
        this.setState({ loading: false })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));
    await axios
      .get(server.url + "/requirements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        let dpl  = [];
        let dps = [];
        //console.log(result.data)
        let res = groupByStatus(result.data);
        dpl = Object.getOwnPropertyNames(res);
        let types = ["info", "danger", "warning"];
        let names = dpl;
        
        for (let i = 0; i < dpl.length; i++) {
          console.log("forrr");
          dps.push(res[dpl[i]].length)
        }
        this.setState({
          dataPie : {labels : dpl, series : dps},
          legendPie : {names, types}
        
        }, ()=> console.log("result : ", this.state.dataPie))
        
        
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));
  }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-keypad text-warning" />}
                statsText={"Products"}
                statsValue={this.state.products.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-gift text-success" />}
                statsText="Promotion"
                statsValue={this.state.promos.length}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
          </Row>
          <Row>

            <Col md={6}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.state.legendPie)}</div>
                }
              />
            </Col>
          </Row>


        </Grid>
      </div>
    );
  }
}

export default Dashboard;
