import React, { Component } from 'react';
import DonutChart from './DonutChart/DonutChart';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      velocity:100
    }
    // setInterval(()=>{
    //     this.setState({
    //       velocity:Math.floor(Math.random() * (1000 - 500)) + 500/2
    //     })
    // },1000);
  }
  render() {
    return (
      <div className="App">
      <DonutChart maxValue={1000} plotFor="velocity" data={this.state}/>
      </div>
    );
  }
}

export default App;
