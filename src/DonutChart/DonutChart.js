import React,{ PropTypes }from 'react';
import * as d3 from 'd3';
const DonutChart = ({maxValue,plotFor,data,width})=>{
  const  colour={
    max:'white',
    velocity:'salmon'
  };

  const parseForSummaryDonut = (range, key, max) => {
    let dataObj = {};
    dataObj[key] = 0.001;
    dataObj.max = max;
    dataObj[key] += +range[key];
    let finalData = Object.keys(dataObj).map(function(d) {
      if (d !== "max") {
        dataObj.max -= +dataObj[d];
      };
      return {
        "Key": d,
        "Value": dataObj[d]
      }
    })
    return finalData;
  };
  const formatdata = (data)=>{
    let dispVal = data.toFixed(0);
    //Adding M/Ks
    if (data >= 1000 && data < 1000000) {
      data /= 1000;

      if ((data.toFixed(1) * 10) === (data.toFixed(0) * 10)) {
        dispVal = data.toFixed(0) + ' K';
      } else {
        dispVal = data.toFixed(1) + ' K';
      }
    } else if (data >= 1000000) {
      data /= 1000000;

      if ((data.toFixed(2) * 100) === (data.toFixed(0) * 100)) {
        dispVal = data.toFixed(0) + ' M';
      } else {
        dispVal = data.toFixed(2) + ' M';
      }
    }
    return dispVal;
  };
  const createDonutChart = (radiusVal) => {
    let radius = radiusVal / 2.3;
    let miniarc = d3.arc().outerRadius(radius).innerRadius(radius - 10).cornerRadius(10),
    blurredBorder = d3.arc().outerRadius(radius - 10).innerRadius(radius),
    minipie = d3.pie().sort(null).value(function(d) {
      return d.Value;
    }),
    totalValue = 0,
    returnValue = [];
    data = parseForSummaryDonut(data, plotFor, maxValue);
    data.forEach(function(d) {
      d.Value = +d.Value;
      if (d.Key !== "max") {
        totalValue = d.Value;
      }
    });
    returnValue.push(<text key="-3" textAnchor="middle" x="-15" y="-10" style={{"fontSize": "20px","fill": "#838282"}}>{formatdata(totalValue)}</text>);
    returnValue.push(<text key="-2" transform="rotate(45)" textAnchor="middle" y="10" x="5" style={{"fontSize": "36px", "fill": "#c3c8cf"}}>|</text>);
    returnValue.push(<text key="-1" textAnchor="middle" x="20" y="20" style={{"fontSize": "15px", "fill": "#c3c8cf"}}>{formatdata(maxValue)}</text>);
    if (totalValue !== 0) {

      minipie(data).forEach((e, i) => {
        returnValue.push(
          <g key={i} className="arc">
          <path d={miniarc(e)} style={{"fill": colour[e.data.Key]}}/>
          <path d={blurredBorder(e)} style={{"fill": colour[plotFor],"opacity":"0.2"}}/>
          </g>
        );
      });
    }
    return returnValue
  };
  return (
    <div className='ChartContainer'>
      <svg width={width} height={width}>
        <g transform={"translate("+width/2+","+width/2+")"}>
        {createDonutChart(width)}
        </g>
      </svg>
    </div>
  );
}
DonutChart.propTypes={
  maxValue: PropTypes.number,
  plotFor: PropTypes.string,
  data: PropTypes.object
}
export default DonutChart;
