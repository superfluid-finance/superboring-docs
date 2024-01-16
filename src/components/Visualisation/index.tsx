import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TokenFlowAnimation = () => {
    const svgRef = useRef();
    const [streamActive, setStreamActive] = useState(false);
    const width = 800;
    const height = 300;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.attr('width', width).attr('height', height);

        // User circle
        const userCircle = svg.append('circle')
            .attr('cx', 50)
            .attr('cy', height / 2)
            .attr('r', 30)
            .attr('fill', 'blue');

        svg.append('text')
            .attr('x', 50)
            .attr('y', height / 2 + 5)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'white')
            .text('User');

        // SuperBoring box
        svg.append('rect')
            .attr('x', width - 500)
            .attr('y', height / 2 - 30)
            .attr('width', 100)
            .attr('height', 60)
            .attr('fill', 'lightgrey');

        svg.append('text')
            .attr('x', width - 450)
            .attr('y', height / 2 + 5)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .text('SuperBoring');

        // Liquidity Mover circle
        const arbCircle = svg.append('circle')
            .attr('cx', width - 250)
            .attr('cy', height / 2)
            .attr('r', 30)
            .attr('fill', 'purple');

        svg.append('text')
            .attr('x', width - 250)
            .attr('y', height / 2 + 5)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'white')
            .text('Arbitrageur');
        

        // Function to generate and animate a token
        const generateToken = () => {
            if (!streamActive) return;

            const token = svg.append('g')
                .attr('class', 'token');

            token.append('circle')
                .attr('cx', 80)
                .attr('cy', height / 2)
                .attr('r', 5)
                .attr('fill', 'green');

            token.append('text')
                .attr('x', 80)
                .attr('y', height / 2+3)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('fill', 'white')
                .text('$');

            // Animate the token
            token.transition()
                .duration(2000)
                .attr('transform', `translate(${width - 580}, 0)`)
                .on('end', () => {
                    d3.select(this).remove(); // Remove token after animation
                });

            // Schedule next token
            setTimeout(generateToken, 500);
        };

        const generateLiquidity = () => {
            if (!streamActive) return;

            const token = svg.append('g')
                .attr('class', 'token');

            token.append('circle')
                .attr('cx', width - 500)
                .attr('cy', height / 2-20)
                .attr('r', 5)
                .attr('fill', 'green');

            token.append('text')
                .attr('x', width - 500)
                .attr('y', height / 2-17)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('fill', 'white')
                .text('$');

            // Animate the token
            token.transition()
                .duration(1000)
                .attr('transform', `translate(${width - 580}, 0)`)
                .on('end', () => {
                    d3.select(this).remove(); // Remove token after animation
                });

            // Schedule next token
            setTimeout(generateToken, 500);
        };

        const generateBtc = () => {
            if (!streamActive) return;

            const token = svg.append('g')
                .attr('class', 'token');

            token.append('circle')
                .attr('cx', width - 250)
                .attr('cy', height / 2+20)
                .attr('r', 5)
                .attr('fill', 'orange');

            token.append('text')
                .attr('x', width - 250)
                .attr('y', height / 2+23)
                .attr('text-anchor', 'middle')
                .style('font-size', '10px')
                .style('fill', 'white')
                .text('฿');

            // Animate the token
            token.transition()
                .duration(1000)
                .attr('transform', `translate(-150, 0)`)
                .on('end', () => {
                    d3.select(this).remove(); // Remove token after animation
                });

            // Schedule next token
            setTimeout(generateToken, 500);
        };

        // Click event on user circle to start/stop the token stream
        userCircle.on('click', () => {
            setStreamActive(!streamActive);
            if (streamActive) {
                generateToken();
                generateLiquidity();
                generateBtc();
                 // Start generating tokens
            }
        });
    }, [streamActive]);

    return <svg ref={svgRef}></svg>;
};

export default TokenFlowAnimation;
