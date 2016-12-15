import React, { Component } from 'react';
import DonutChart from './DonutChart/DonutChart';
import request from './common/request';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      velocity:0
    }
    setInterval(()=>{this.getData()},1500);
  }
  async getData(){
    let {velocity} = await request('data/sampleData.json');
    this.setState({
      velocity:velocity
    });
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
