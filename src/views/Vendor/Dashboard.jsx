import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import server from "../../server.json";
import axios from "axios";
import {
  responsiveSales
} from "variables/Variables.jsx";
import { dataPie } from "variables/Variables";

var optionsSales = {
  low: 0,
  high: 800,
  showArea: false,
  height: "245px",
  axisX: {
    showGrid: false
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50
  }
};
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
    revenue: [],
    requirements: [],
    dataPie : {
      labels: [],
      series: []
    },
    legendPie : {
      names: [],
      types: []
    },
    dataSales : {
      labels: [],
      series: [[]]
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
      .get(server.url + "/promotions/vendor/"+localStorage.getItem("userId"), {
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
      .get(server.urlZaki + "/reports/revenue/" + localStorage.getItem("userId"))
      .then((result) => {
        console.log(result.data);
        //////////
        let labels = [];
        let series = [[]];
        console.log(result.data.length)
        for(let i = 0; i< result.data.length ; i++){
          labels.push(result.data[i].day+"");
          series[0].push(result.data[i].amount);
        }
        // labels = ["a", "b", "c"];
        // series = [100, 200, 140];

        console.log("labels: ", labels);
        console.log("series: ", series);
        this.setState({dataSales : {labels, series}}, console.log("state: ",this.state.dataPie));
        
        this.setState({ loading: false })
      }
      )
      .catch((err) =>{ 
        console.log(err);
      this.setState({ loading: false, error: err.response })
      
    }
      );
    
    
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
          // console.log("forrr");
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
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-keypad text-warning" />}
                statsText={"Products"}
                statsValue={this.state.products.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />

              <StatsCard
                bigIcon={<i className="pe-7s-gift text-success" />}
                statsText="Promotion"
                statsValue={this.state.promos.length}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>

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

          <Row>
            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Transaction history"
                category=""
                stats="Updated now"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
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
