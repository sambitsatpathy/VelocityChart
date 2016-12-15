import React,{ PropTypes }from 'react';
import * as d3 from 'd3';
const DonutChart = ({maxValue,plotFor,data})=>{
  const  colour={
    max:'white',
    velocity:'salmon'
  },
  width=128;

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
    let dispTotal = totalValue.toFixed(0);
    //Adding M/Ks
    if (totalValue >= 10000 && totalValue < 1000000) {
      totalValue /= 1000;

      if ((totalValue.toFixed(1) * 10) === (totalValue.toFixed(0) * 10)) {
        dispTotal = totalValue.toFixed(0) + ' K';
      } else {
        dispTotal = totalValue.toFixed(1) + ' K';
      }
    } else if (totalValue >= 1000000) {
      totalValue /= 1000000;

      if ((totalValue.toFixed(2) * 100) === (totalValue.toFixed(0) * 100)) {
        dispTotal = totalValue.toFixed(0) + ' M';
      } else {
        dispTotal = totalValue.toFixed(2) + ' M';
      }
    }
    ////END
    returnValue.push(<text key="-3" textAnchor="middle" y="-10" style={{"fontSize": "25px","fill": "#838282", "fontWeight": "100"}}>{dispTotal}</text>);
    returnValue.push(<text key="-2" textAnchor="middle" y="13" style={{"fontSize": "11px", "fill": "#c3c8cf", "fontWeight": "200"}}>Orders</text>);
    returnValue.push(<text key="-1" textAnchor="middle" y="25" style={{"fontSize": "11px", "fill": "#c3c8cf", "fontWeight": "200"}}>Per Second</text>);
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
