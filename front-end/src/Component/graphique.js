import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

class Graphique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataFetch: [],
      dataForGraphsX: [],
      chartData: {
        //X//
        datasets: [
          {
            label: ["Graphique"],
            borderWidth: 2,
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: ["rgba(17, 116, 136, 1)"]
          }
        ]
      }
    };
  }
 
  // meilleur lisibilité le ComponentDidMount déclanche les deux setInterval au rendu du composant et fait donc un appel au deux fonction au requet //
  componentDidMount = () => {
    setInterval(this.fetchdata, 30000);
    setInterval(this.saveData, 30000);
    // const dataForGraphsX = [];
    // const dataForGraphsY = [];

    // for(var i in dataFetch['bot'].cpuUsage){
    //     dataForGraphsX.push(dataFetch['bot'])
    // }
  };

  fetchdata = () => {
    axios
      .get("http://localhost:3000/first")
      .then(response => {
        this.setState({ dataFetch: response, dataForGraphsX: response.data.blockchain.currentHeight });
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
    const loading = this.state.loading;
    if (loading) {
      var texteLoading = <img src="./Spinner-1s-200px.svg" />;
    }
    // console.log(this.state.chartData);
    return (
      <div className="chart">
        <Line data={this.state.chartData} />
        {texteLoading}
      </div>
    );
  }
}

export default Graphique;