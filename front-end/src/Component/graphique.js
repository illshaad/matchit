import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";


class Graphique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetch: [], //Toute la donnée prevenant d'api stocké //
      dataForGraphTime: [], // Ma donnée formattedTime stocké//
      dataForGraphCpu: [],
      dataForGraphMemory: [],
      dataForGraphNetIn : [],
      dataForGraphNetOut : [],
      dataForGraphHeight : [],
      count : 30 , 
    };
  }

  // Le ComponentDidMount déclanche les deux setInterval au rendu du composant et fait donc un appel au deux fonctions qui requet sur l'api//
componentDidMount = () => {
    setInterval(this.fetchdata, 30000);
    setInterval(this.saveData, 30000);
    setInterval(this.countDown , 1000);
  };

  countDown = () => {
    this.setState({
        count : this.state.count -1
    })
}


fetchdata = () => { 
    //Création du TimeTemp//
        const date = new Date();
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(formattedTime)

// Fetch sur mon Back pour recevoir toute la donnée prevenant de l'api sur le Front et mise à jour du state//
    axios
      .get("http://localhost:3000/first")
      .then(response => {
        this.setState({
          dataFetch: response, //Mise à jjour du state //

          dataForGraphTime: [ // Mise à jour du state //
            ...this.state.dataForGraphTime,
            formattedTime
          ],
          dataForGraphCpu: [ // Mise à jour du state //
            ...this.state.dataForGraphCpu,
            response.data.bot.cpuUsage
          ],
          dataForGraphMemory : [ // Mise à jour du state //
              ...this.state.dataForGraphMemory,
              response.data.bot.memory
          ],
          dataForGraphNetIn : [ // Mise à jour du state //
              ...this.state.dataForGraphNetIn,
              response.data.bot.netIn
          ],
          dataForGraphNetOut : [ // Mise à jour du state //
            ...this.state.dataForGraphNetIn,
            response.data.bot.netOut
        ],
          dataForGraphHeight : [ // Mise à jour du state //
            ...this.state.dataForGraphNetIn,
            response.data.blockchain.currentHeight
        ],
        });
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };
// Une fois la donnée selectionné que je stock dans mon state je fetch sur mon back pour sauvegarder dans Mlab//
saveData = () => {
        axios
        .post("http://localhost:3000/save", this.state.dataFetch)
        .then(response => {
            console.log(this.state.dataFetch);
        })
        .catch(error => console.log(error));
    };

  
   
   

render() {

    
    //Tracement du graphique //
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
          <h1>J'actualise mon graphique tous les {this.state.count} secondes </h1>
        <Line data={chartData} />
      </div>
    );
  }
}

export default Graphique;