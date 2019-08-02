import React, { Component } from "react";

class countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
    counter : 30, 
    };
}
componentDidMount = () => {
    setInterval(this.countDown , 1000);
  };
  countDown = () => {
    if(this.state.counter === 0){
        this.setState({
            counter: 30
        }); 
    }else {
       this.setState({
           counter : this.state.counter -1
       })
    }
}
   
render() {
    return (
        <h1>J'actualise mon graphique tous les {this.state.counter} secondes </h1>
    );
  }
}

export default countdown ;