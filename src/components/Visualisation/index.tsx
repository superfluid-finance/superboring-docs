import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const TokenFlowAnimation = () => {
  const svgRef = useRef();
  const [streamActive, setStreamActive] = useState(false);
  const width = 800;
  const height = 300;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    // User circle
    const userCircle = svg
      .append("circle")
      .attr("cx", 50)
      .attr("cy", height / 2)
      .attr("r", 30)
      .attr("fill", "blue");

    svg
      .append("text")
      .attr("x", 50)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .text("User");

    //Clicking message

    svg
      .append("text")
      .attr("x", 150)
      .attr("y", height / 2 - 100)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "red")
      .text('Click multiple times on "User" to start stream');

    svg
      .append("text")
      .attr("x", 550)
      .attr("y", height / 2 - 100)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "red")
      .text('Click on "Arbitrageur" to arbitrage BTC');

    // SuperBoring box
    svg
      .append("rect")
      .attr("x", width - 500)
      .attr("y", height / 2 - 30)
      .attr("width", 100)
      .attr("height", 60)
      .attr("fill", "lightgrey");

    svg
      .append("text")
      .attr("x", width - 450)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SuperBoring");

    // Liquidity Mover circle
    const arbCircle = svg
      .append("circle")
      .attr("cx", width - 250)
      .attr("cy", height / 2)
      .attr("r", 30)
      .attr("fill", "purple");

    svg
      .append("text")
      .attr("x", width - 250)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .text("Arbitrageur");

    // Uniswap box
    svg
      .append("rect")
      .attr("x", width - 100)
      .attr("y", height / 2 - 30)
      .attr("width", 100)
      .attr("height", 60)
      .attr("fill", "pink");

    svg
      .append("text")
      .attr("x", width - 50)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Liquidity Source")
      .append("tspan")
      .attr("x", width - 50)
      .attr("dy", "1.2em") // Adjust this value to set the distance between lines
      .text("(eg. Uniswap)");

    //Arrows
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "red");

    svg
      .append("line")
      .attr("x1", 550)
      .attr("y1", height / 2 - 90)
      .attr("x2", 550)
      .attr("y2", height / 2 - 50)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "red");

    svg
      .append("line")
      .attr("x1", 50)
      .attr("y1", height / 2 - 90)
      .attr("x2", 50)
      .attr("y2", height / 2 - 50)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    // Function to generate and animate a token
    let count = 0;
    const generateToken = () => {
      if (!streamActive) return;

      const token = svg.append("g").attr("class", "token");

      token
        .append("circle")
        .attr("cx", 80)
        .attr("cy", height / 2)
        .attr("r", 5)
        .attr("fill", "green");

      token
        .append("text")
        .attr("x", 80)
        .attr("y", height / 2 + 3)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "white")
        .text("$");

      // Animate the token
      token
        .transition()
        .duration(500)
        .attr("transform", `translate(${width - 580}, 0)`)
        .on("end", () => {
          d3.select(this).remove(); // Remove token after animation
        });
      count++;
      if (count < 100) {
        setTimeout(generateToken, 1);
      }
    };

    const generateLiquidity = () => {
      if (!streamActive) return;

      const token = svg.append("g").attr("class", "token");

      token
        .append("circle")
        .attr("cx", width - 500)
        .attr("cy", height / 2 - 20)
        .attr("r", 5)
        .attr("fill", "green");

      token
        .append("text")
        .attr("x", width - 500)
        .attr("y", height / 2 - 17)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "white")
        .text("$");

      // Animate the token
      token
        .transition()
        .duration(1000)
        .attr("transform", `translate(${width - 580}, 0)`)
        .on("end", () => {
          d3.select(this).remove(); // Remove token after animation
        });

      // Schedule next token
      setTimeout(generateToken, 500);
    };

    const generateLiquidityToUni = () => {
      if (!streamActive) return;

      const token = svg.append("g").attr("class", "token");

      token
        .append("circle")
        .attr("cx", width - 220)
        .attr("cy", height / 2 - 20)
        .attr("r", 5)
        .attr("fill", "green");

      token
        .append("text")
        .attr("x", width - 220)
        .attr("y", height / 2 - 17)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "white")
        .text("$");

      // Animate the token
      token
        .transition()
        .duration(1000)
        .attr("transform", `translate(${width - 580}, 0)`)
        .on("end", () => {
          d3.select(this).remove(); // Remove token after animation
        });

      // Schedule next token
      setTimeout(generateToken, 500);
    };

    const generateBtc = () => {
      if (!streamActive) return;

      const token = svg.append("g").attr("class", "token");

      token
        .append("circle")
        .attr("cx", width - 250)
        .attr("cy", height / 2 + 20)
        .attr("r", 5)
        .attr("fill", "orange");

      token
        .append("text")
        .attr("x", width - 250)
        .attr("y", height / 2 + 23)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "white")
        .text("฿");

      // Animate the token
      token
        .transition()
        .duration(1000)
        .attr("transform", `translate(-150, 0)`)
        .on("end", () => {
          d3.select(this).remove(); // Remove token after animation
        });

      // Schedule next token
      setTimeout(generateToken, 500);
    };

    const generateBtcToUni = () => {
      if (!streamActive) return;

      const token = svg.append("g").attr("class", "token");

      token
        .append("circle")
        .attr("cx", width - 100)
        .attr("cy", height / 2 + 20)
        .attr("r", 5)
        .attr("fill", "orange");

      token
        .append("text")
        .attr("x", width - 100)
        .attr("y", height / 2 + 23)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "white")
        .text("฿");

      // Animate the token
      token
        .transition()
        .duration(1000)
        .attr("transform", `translate(-150, 0)`)
        .on("end", () => {
          d3.select(this).remove(); // Remove token after animation
        });

      // Schedule next token
      setTimeout(generateToken, 500);
    };

    // Click event on user circle to start/stop the token stream
    userCircle.on("click", () => {
      setStreamActive(!streamActive);
      if (streamActive) {
        generateToken();
        // Start generating tokens
      }
    });

    arbCircle.on("click", () => {
      setStreamActive(!streamActive);
      if (streamActive) {
        generateLiquidity();
        generateBtc();
        generateLiquidityToUni();
        generateBtcToUni();
        // Start generating tokens
      }
    });
  }, [streamActive]);

  return <svg ref={svgRef}></svg>;
};

export default TokenFlowAnimation;
