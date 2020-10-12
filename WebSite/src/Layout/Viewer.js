import React, {Component} from "react";
import "../Assets/Css/App.css"
import * as d3 from "d3";

import {connect} from "react-redux";
import * as actionTypes from '../Actions/ActionsTypes';

class Viewer extends Component {

    componentDidMount() {
        const convert = require('xml-js');
        const result = convert.xml2js(this.props.textFile, {ignoreComment: true, alwaysChildren: true});

        const data = this.createD3Data(result.elements[0].elements[0]);
        const tree = this.constructTree(data);

        // On laisse le dispatch pour le moment
        this.props.dispatch({type: actionTypes.SET_TREE, payload: tree});
    }

    createD3Data = (xmlTextFile) => {
        return this.recurseD3Data(xmlTextFile);
    };

    recurseD3Data = function recurse(root, newColor = "") {

        let currentData = {
            name: "",
            children: null,
            value: 0,
            color:newColor,
            score:" "
        };

        if (root.attributes !== undefined && root.attributes !== null) {
            currentData.name = root.attributes.TEXT;

        }

        let tmpscore = "";
        if(root.attributes.SCORE != null)
        {
            tmpscore =  "\n" + root.attributes.SCORE;
        }

        if (root.elements.length === 0) {

            let value = parseInt(root.attributes.CREATED);

            currentData = {
                name: root.attributes.TEXT,
                value: value,
                color: newColor,
                score: tmpscore
            };

        } else {
            //console.log(root.attributes);
            if(root.elements[0].attributes.COLOR != null)
            {
                newColor = root.elements[0].attributes.COLOR;
            }

            let children = [];
            for (let i = 0; i < root.elements.length; i++) {
                if (root.elements[i].name === "node") {
                    children.push(recurse(root.elements[i], newColor));
                }
            }

            currentData = {
                name: root.attributes.TEXT,
                children: children,
                color: newColor,
                score: tmpscore
            }
        }

        return currentData;
    };

    constructTree = (data) => {
        const margin = ({top: 10, right: 120, bottom: 10, left: 40});
        const width = window.innerWidth;

        //const offsetx = 100;
        //const offsety = window.innerHeight / 2;

        const dy = width / 20;
        const dx = 30;
        const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
        const tree = d3.tree().nodeSize([dx, dy]).separation(function separation(a, b) {

            function TotalNbChild(tab) {
                if(tab.children == null){
                    return 0;
                }
                let tmp = tab.children.length;
                for (let i = 0; i < tab.children.length; i++) {
                    tmp =  tmp + TotalNbChild(tab.children[i]);
                }
                return tmp;
              }

            let sep = 0;
            if(a.children != null)
            {
               sep =  TotalNbChild(a);
            }
            if(b.children != null)
            {
                let tmpSep = TotalNbChild(b);
                if(tmpSep> sep)
                    sep = tmpSep
            }
            return (a.parent === b.parent ? (1 + sep/1.5) : 1 );
        });

        const root = d3.hierarchy(data);

        root.x0 = dy / 2;
        root.y0 = 0;
        root.descendants().forEach((d, i) => {
            d.id = i;
            d._children = d.children;
            if (d.depth) d.children = null;
        });

        const svg = d3.select("svg")
            .attr("viewBox", [-margin.left, -margin.top, width, dx])
            .style("font", "10px sans-serif")
            .style("user-select", "none");

        const gLink = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5);

        const gNode = svg.append("g")
            .attr("cursor", "pointer")
            .attr("pointer-events", "all");

        function update(source) {
            const duration = d3.event && d3.event.altKey ? 2500 : 250;
            const nodes = root.descendants().reverse();
            const links = root.links();

            // Compute the new tree layout.
            tree(root);

            let left = root;
            let right = root;
            root.eachBefore(node => {
                if (node.x < left.x) left = node;
                if (node.x > right.x) right = node;
            });

            const height = right.x - left.x + margin.top + margin.bottom;

            const transition = svg.transition()
                .duration(duration)
                .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
                .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

            // Update the nodes…
            const node = gNode.selectAll("g")
                .data(nodes, d => d.id);

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node.enter().append("g")
                .attr("transform", d => `translate(${source.y0},${source.x0})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            //.attr("xlink:href", function(node) {})


            nodeEnter.append("circle")
                .attr("cx", d => d._children ? 0 : 1)
                .attr("r", d => d._children ? 2.5 : 1)
                //attr("fill", d => d._children ? "#555" : "    ")
                .attr("stroke", d => d._children? "none" : d.data.color)
                .attr("stroke-width", 5)
                .style("fill", d => d._children ?  d.data.color : "none")
                .on("click", d => {
                    d.children = d.children ? null : d._children;
                    update(d);
                });

            nodeEnter.append("text")
                .attr("dy", "0.31em")
                .attr("x", d => d._children ? -6 : 6)
                .attr("text-anchor", d => d._children ? "end" : "start")
                .text(d => d.data.name )
                .style("fill", "#000")
                .on("click", d => {
                    if (d.data.name.includes("http"))
                        window.open(d.data.name, '_blank');
                    update(d);
                })
                .clone(true).lower()
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 3)
                .attr("stroke", "white");

            nodeEnter.append("text")
            .style("font", "5px times")
            .attr("dy", "0.31em")
            .attr("x", d => d._children ? -10 : 10)
            .attr("y",  10)
            .attr("text-anchor", d => d._children ? "end" : "start")
            .text(d =>  d.data.score)
            .style("fill", "#000" )
            .on("click", d => {
                if (d.data.name.includes("http"))
                    window.open(d.data.name, '_blank');
                update(d);
            })
            .clone(true).lower()
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .attr("stroke", "white");

            // Transition nodes to their new position.
            const nodeUpdate = node.merge(nodeEnter).transition(transition)
                .attr("transform", d => `translate(${d.y},${d.x})`)
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            const nodeExit = node.exit().transition(transition).remove()
                .attr("transform", d => `translate(${source.y},${source.x})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            // Update the links…
            const link = gLink.selectAll("path")
                .data(links, d => d.target.id);


            // Enter any new links at the parent's previous position.
            const linkEnter = link.enter().append("path")
                .attr("d", d => {
                    const o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .attr("stroke", function(d){ 
                    return (d.target.data.color)});

            // Transition links to their new position.
            link.merge(linkEnter).transition(transition)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition(transition).remove()
                .attr("d", d => {
                    const o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                });

            // Stash the old positions for transition.
            root.eachBefore(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        update(root);
        return svg.node();
    };

    render = () => {
        return (
            <div className="Viewer-div">
                <svg className="Viewer-svg" viewBox={200} id="svg">
                </svg>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        textFile: state.Viewer.textFile,
        dispatch: state.Viewer.dispatch
    };
};

export default connect(mapStateToProps)(Viewer);