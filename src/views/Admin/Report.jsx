import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  // dataSales,
  // optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import Spinner from "../../Spinner";
import server from "../../server.json";
import axios from "axios";

var dataSales = {
  labels: [],
  series: [[]]
};
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

class Dashboard extends Component {
  state = {
    employees: [],
    products: [],
    customers: [],
    vendors: [],

    alltransaction: "",
    totalfailure: "",
    totalsuccess: "",
    totalbalance:"",

    

    error: null,
    loading: false,
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
    //employees
    this.setState({ loading: true });
    await axios
      .get(server.url + "/employees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        console.log(result.data);
        this.setState({ employees: result.data })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));


    await axios
      .get(server.url + "/products"
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      )
      .then((result) => {
        // console.log(result.data);
        this.setState({ products: result.data })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));

      await axios
      .get(server.url + "/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        //console.log(result.data);
        this.setState({ customers: result.data })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));

      await axios
      .get(server.url + "/vendors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        this.setState({ vendors: result.data })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));

      await axios
      .get(server.urlAde + "/card/transactiondata", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        this.setState({ totaltransaction: result.data.total,
                        totalsuccess: result.data.success,
                        totalfailure: result.data.fail,
                        totalbalance: result.data.balance
        })
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));


      await axios
      .get(server.urlAde + "/card/totalamtbymonth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((result) => {
        console.log(result.data);
        
        dataSales.labels.push("JUNE","JULY")
        for(let i = 0; i< Object.getOwnPropertyNames(result.data).length ; i++){
          dataSales.labels.push(Object.getOwnPropertyNames(result.data)[i]);
        }
        dataSales.series[0].push(400);
        dataSales.series[0].push(200);
        let size = dataSales.series[0].length;
       for(let i = 0; i< Object.getOwnPropertyNames(result.data).length  ; i++){  
        console.log("asdfghj",result.data[dataSales.labels[size+i]]); 
         dataSales.series[0].push(result.data[dataSales.labels[size+i]]);
       }
       optionsSales.high = Math.max(dataSales.series[0]);
        console.log(dataSales);
      }
      )
      .catch((err) => this.setState({ loading: false, error: err.response }));

      

      this.setState({ loading: false });
  }

  render() {
    return (
      <div className="content">
        {this.state.loading ? (
          <Spinner />
        ) : (
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="Employees"
                statsValue={this.state.employees.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-shopbag text-success" />}
                statsText="Products"
                statsValue={this.state.products.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-user-female text-danger" />}
                statsText="Customers"
                statsValue={this.state.customers.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-share text-info" />}
                statsText="Vendors"
                statsValue={this.state.vendors.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph3 text-warning" />}
                statsText="Total transaction"
                statsValue={this.state.totaltransaction}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph3 text-success" />}
                statsText="Success Transaction"
                statsValue={this.state.totalsuccess}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph3 text-danger" />}
                statsText="Failure Transaction"
                statsValue={this.state.totalfailure}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph text-info" />}
                statsText="Total Balance"
                statsValue={this.state.totalbalance}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
           
          </Row>

        </Grid>)}
      </div>
    );
  }
}

export default Dashboard;
