import React,{ PropTypes }from 'react';
import * as d3 from 'd3';

const LineChart=({maxValue,data,height,width})=> {

    let x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().domain([0,maxValue]).range([height, 0]),
    inverseData = data.map((d)=>maxValue-d),
    line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d, i) { return x(i); })
    .y(function(d) { return y(d); });
    x.domain(d3.extent(data, function(d,i) { return i; }));
    return (
      <div className='ChartContainer'>
        <svg id="lineChart" width={width} height={height}>
          <g transform="translate(50,20)">
            <path className="line" d={line(data)} style={{"stroke": "salmon"}}></path>
            <path className="line" d={line(inverseData)} style={{"stroke": "lightgreen"}}></path>
          </g>
        </svg>
      </div>
    )
}

LineChart.propTypes={
  data: PropTypes.array
}

export default LineChart;
