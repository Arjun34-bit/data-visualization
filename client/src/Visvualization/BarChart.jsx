import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    const width = svg.attr("width");
    const height = svg.attr("height");

    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d)])
      .nice()
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "steelblue");

    // Optional: Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat((i) => `Bar ${i + 1}`);
    svg.select(".x-axis").call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [data]);

  return (
    <svg ref={svgRef} width={400} height={300}>
      <g className="x-axis" transform={`translate(0, ${300})`} />
      <g className="y-axis" />
    </svg>
  );
};

export default BarChart;
