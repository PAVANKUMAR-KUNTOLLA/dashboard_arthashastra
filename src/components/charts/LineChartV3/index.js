import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import LineChartOptions from "./LineChartOptions";
import { intToString } from "../../../utils";

// Convert to Chart data
const convertToChartData = (data, y) => {
  let tempArr = [];

  Object.keys(data).map((val) => {
    let seriesObj = {};
    seriesObj["name"] = val;
    seriesObj["data"] = [];
    data[val].map((obj) => {
      seriesObj["data"].push(obj[y]);
    });
    tempArr.push(seriesObj);
  });

  return tempArr;
};

// X Labels - Categories
function getCategories(data, x) {
  let tempArr = [];
  if (Object.values(data).flat().length) {
    Object.values(data)
      .flat()
      .map((obj) => tempArr.push(obj[x]));
  }
  return [...new Set(tempArr)];
}

const LineChartV3 = ({
  data,
  title,
  subtitle,
  chartHeight,
  isLoading,
  xLabel,
  yLabel,
  x_field,
  y_field,
}) => {
  const [chartOptions, setChartOptions] = useState(LineChartOptions);

  useEffect(() => {
    if (Object.keys(data).length) {
      setChartOptions({
        ...chartOptions,
        chart: {
          height: `${chartHeight}px`,
          marginLeft: 0, // Remove left margin
          marginRight: 0, // Remove right margin
        },
        title: {
          text: title,
          style: {
            fontSize: "24px", // Adjust the chart title font size as needed
          },
        },
        subtitle: { text: subtitle },
        xAxis: {
          title: {
            text: "Years",
            style: {
              fontSize: "16px", // Adjust the X-axis title font size as needed
            },
          },
          categories: getCategories(data, x_field),
        },
        yAxis: {
          title: {
            text: "Medals Won",
            style: {
              fontSize: "16px", // Adjust the Y-axis title font size as needed
            },
          },
          labels: {
            formatter: function () {
              return intToString(this.value);
            },
          },
        },
        series: convertToChartData(data, y_field),
        // Set series type to "line" and increase lineWidth
        plotOptions: {
          series: {
            type: "line",
            lineWidth: 2, // Adjust the line width as needed
          },
        },
      });
    } else {
      setChartOptions(LineChartOptions);
    }
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{
        style: {
          height: "100%",
          width: "100%",
          margin: "0", // Remove any margin
          padding: "0", // Remove any padding
        },
      }}
    />
  );
};

LineChartV3.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  x_field: PropTypes.string,
  y_field: PropTypes.string,
  chartHeight: PropTypes.number,
  isLoading: PropTypes.bool,
};

LineChartV3.defaultProps = {
  title: "Medals Won in Olympics",
  chartHeight: 700,
  isLoading: false,
  x_field: "Year",
  y_field: "Medals",
  data: {
    Gold_Medals: [
      {
        Id: 1,
        Year: 2004,
        Medals: 1,
      },
      {
        Id: 2,
        Year: 2008,
        Medals: 3,
      },
      {
        Id: 3,
        Year: 2012,
        Medals: 6,
      },
      {
        Id: 4,
        Year: 2016,
        Medals: 2,
      },
      {
        Id: 5,
        Year: 2020,
        Medals: 7,
      },
    ],
  },
};

export default LineChartV3;
