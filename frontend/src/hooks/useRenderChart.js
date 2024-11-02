import * as d3 from "d3";
import { useEffect } from "react";

function useRenderChart(loadingData, data, svgRef, input2, input) {
    useEffect(() => {
        if (!loadingData && data.length > 0) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove(); // Clear previous contents

            // Set dimensions and margins
            const width = 1000;
            const height = 700;
            const margin = { top: 20, right: 30, bottom: 40, left: 60 };

            // Define scales
            const xScale = d3
                .scaleLinear()
                .domain([d3.min(data, (d) => d.x), d3.max(data, (d) => d.x)])
                .range([margin.left, width - margin.right]);

            const yScale = d3
                .scaleLinear()
                .domain([d3.min(data, (d) => d.y), d3.max(data, (d) => d.y)])
                .range([height - margin.bottom, margin.top]);

            // Define X-axis
            svg
                .append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).ticks(5))
                .append("text")
                .attr("x", width / 2)
                .attr("y", margin.bottom - 10)
                .attr("fill", "black")
                .style("text-anchor", "middle")
                .text(input2);

            // Define Y-axis
            svg
                .append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale))
                .append("text")
                .attr("x", -margin.left)
                .attr("y", height / 2)
                .attr("fill", "black")
                .attr("transform", "rotate(-90)")
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Price");

            // Plot data points
            svg
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => xScale(d.x))
                .attr("cy", (d) => yScale(d.y))
                .attr("r", 3)
                .style("fill", "steelblue");

            // Calculate linear regression
            const xMean = d3.mean(data, (d) => d.x);
            const yMean = d3.mean(data, (d) => d.y);
            const m =
                d3.sum(data, (d) => (d.x - xMean) * (d.y - yMean)) /
                d3.sum(data, (d) => Math.pow(d.x - xMean, 2));
            const b = yMean - m * xMean;

            // Define the start and end points for the regression line
            const xMin = d3.min(data, (d) => d.x);
            const xMax = d3.max(data, (d) => d.x);
            const yMin = m * xMin + b;
            const yMax = m * xMax + b;

            // Add regression line
            const regressionLine = svg
                .append("line")
                .attr("x1", xScale(xMin))
                .attr("y1", yScale(yMin))
                .attr("x2", xScale(xMax))
                .attr("y2", yScale(yMax))
                .attr("stroke", "red")
                .attr("stroke-width", 2);

            // Add tooltip for displaying price on hover
            const tooltip = d3
                .select("body")
                .append("div")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "white")
                .style("padding", "5px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "5px")
                .style("font-size", "12px");

            svg.on("mousemove", (event) => {
                const [mouseX] = d3.pointer(event);
                const xValue = xScale.invert(mouseX);
                const yValue = m * xValue + b;

                // Position and update tooltip
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 20 + "px")
                    .style("visibility", "visible")
                    .text(`Price: ${yValue.toFixed(2)}`);
            });

            svg.on("mouseleave", () => {
                tooltip.style("visibility", "hidden");
            });
        }
    }, [loadingData, data, svgRef]);
}

export default useRenderChart;
