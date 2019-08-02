import React, { Component } from "react";

class countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
    count : 5 , 
    };
}
componentDidMount = () => {
    setInterval(this.countDown , 1000);
  };
  countDown = () => {
    if(this.state.count > 0){
      this.setState({
          count : this.state.count -1
      })
    }else {
        clearInterval(this.countDown);
        window.location.reload();
      }
}

render() {
    return (
        <h1>J'actualise mon graphique tous les {this.state.count} secondes </h1>
    );
  }
}

export default countdown ;