import React, { Component } from 'react';
import DonutChart from './DonutChart/DonutChart';
import LineChart from './LineChart/LineChart';
import request from './common/request';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      velocity:0,
      history:[0]
    }
    setInterval(()=>{this.getData()},1500);
  }

  async getData(){
    let {velocity} = await request('data/sampleData.json'),
        {history} = this.state;
    // history.push(velocity);
    // if(history.length>10){
    //   history.shift();
    // }
    this.setState({
      velocity,history
    });
  }

  render() {
    const maxValue=1000,
          height=150,
          width=window.innerWidth*.90;
    return (
      <div className="App">
        <DonutChart maxValue={maxValue} width={height} plotFor="velocity" data={{velocity:this.state.velocity}}/>
        {
          // <LineChart maxValue={maxValue} width={width-height} height={height} data={this.state.history}/>
        }
      </div>
    );
  }
}
