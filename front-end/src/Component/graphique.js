import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Graphique extends Component{
    constructor(props){
        super(props);
        this.state = {

        loading :true,
            chartData : {
                 //X//
                datasets : [
                    {
                    label : ['Graphique'], 
                    borderWidth : 2,
                    backgroundColor : [
                        'rgba(0, 0, 0, 0)',
                    ],
                    borderColor : [
                        'rgba(17, 116, 136, 1)',
                    ],
                },
            ],
        },
    }
}
            componentDidMount(){
                function fetchdata(){
                fetch('http://localhost:3000/first')
                .then(response => response.json())
                .then(data =>{
                    console.log(data , 'testeeeee')
                })
                }
            setInterval(fetchdata,30000);
        }
        render(){

        const loading = this.state.loading; 
        if(loading){
            var texteLoading = <img src='./Spinner-1s-200px.svg'/>
        }
        console.log(this.state.chartData)
        return(
        <div className='chart'>
        
        <Line
            data = {this.state.chartData}
        />
        {texteLoading}
        </div>
        );
    }
}

export default Graphique;
  