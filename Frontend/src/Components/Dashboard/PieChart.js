// import './piechart.css'
import React from "react";
import { Chart } from "react-google-charts";

function PieChart(props) {
    // const totalRecords = 0
    // const sarcasmRecords = 0
    const data = [
        ["Class", "Number of Data Records"],
        ["Sarcasm", props.sarcasmNumber],
        ["Regular", props.regularNumber],
    ];

  return (
    <div className="pie">
        <Chart
            chartType="PieChart"
            data={data}
            options={{
                pieHole: 0.4,
                pieSliceTextStyle: { color: "white" },
            }}
            graph_id="DonutChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
            // legend={{position: 'top', textStyle: {color: 'blue', fontSize: 16}}}
        />
    </div>
  );
}

export default PieChart;