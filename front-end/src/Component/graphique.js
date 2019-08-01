import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";


class Graphique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetch: [], //ma donnée stocké dans mon state //
      dataForGraphTime: [],
      dataForGraphCpu: [],
      dataForGraphMemory: [],
      dataForGraphNetIn : [],
      dataForGraphNetOut : [],
      dataForGraphHeight : [],
      counter : 0,
    };
  }

  // meilleur lisibilité le ComponentDidMount déclanche les deux setInterval au rendu du composant et fait donc un appel au deux fonction qui requet à l'api//
  componentDidMount = () => {
    setInterval(this.fetchdata, 5000);
    setInterval(this.saveData, 5000);
  };

  fetchdata = () => {
    var date = new Date();
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime)

    axios
      .get("http://localhost:3000/first")
      .then(response => {
        this.setState({
          dataFetch: response,
          dataForGraphTime: [
            ...this.state.dataForGraphTime,
            formattedTime
          ],
          dataForGraphCpu: [
            ...this.state.dataForGraphCpu,
            response.data.bot.cpuUsage
          ],
          dataForGraphMemory : [
              ...this.state.dataForGraphMemory,
              response.data.bot.memory
          ],
          dataForGraphNetIn : [
              ...this.state.dataForGraphNetIn,
              response.data.bot.netIn
          ],
          dataForGraphNetOut : [
            ...this.state.dataForGraphNetIn,
            response.data.bot.netOut
        ],
          dataForGraphHeight : [
            ...this.state.dataForGraphNetIn,
            response.data.blockchain.currentHeight
        ]
        });
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  saveData = () => {
    axios
      .post("http://localhost:3000/save", this.state.dataFetch)
      .then(response => {
        console.log(this.state.dataFetch);
      })
      .catch(error => console.log(error));
  };
render() {
    const chartData = {
      datasets: [
        {
          label: "CpuUsage",
          data: this.state.dataForGraphCpu,
          borderWidth: 2,
          backgroundColor: [
            "rgba(255, 255, 255, 0.1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
          ]
        },
        {
            label: "Memory",
            data: this.state.dataForGraphMemory,
            borderWidth: 2,
            backgroundColor: [
            "rgba(255, 255, 255, 0.1)"
             
            ],
            borderColor: [
            "rgba(67, 189, 10, 1)",
            ]
          },
          {
            label: "NetIn",
            data: this.state.dataForGraphNetIn,
            borderWidth: 2,
            backgroundColor: [
            "rgba(255, 255, 255, 0.1)"
            ],
            borderColor: [
            "rgba(367, 189, 10, 1)",

            ]
          },
          {
            label: "NetOut",
            data: this.state.dataForGraphNetOut,
            borderWidth: 2,
            backgroundColor: [
            "rgba(255, 255, 255, 0.1)"
            ],
            borderColor: [
            "rgba(167, 589, 10, 1)",
            ]
          },
          {
            label: "CurrentHeight",
            data: this.state.dataForGraphHeight,
            borderWidth: 2,
            backgroundColor: [
            "rgba(255, 255, 255, 0.1)"
            ],
            borderColor: [
            "rgba(227, 389, 10, 1)",
            ]
          },
      ],
      labels: this.state.dataForGraphTime //XTime//
    };
    return (
      <div className="chart">
        <Line data={chartData} />
      </div>
    );
  }
}

export default Graphique;