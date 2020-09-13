import React, {Component} from "react";
import "./App.css"
import * as d3 from "d3";

class Viewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textFile: props.textFile,
            data: null,
            tree: null
        };

    }

    componentDidMount() {
        const convert = require('xml-js');
        const result = convert.xml2js(this.state.textFile, {ignoreComment: true, alwaysChildren: true});

        this.createD3Data(result.elements[0].elements[0]);

        this.state.tree = this.constructTree();
    }

    createD3Data = (xmlTextFile) => {
        this.state.data = this.recurseD3Data(xmlTextFile);
    };

    recurseD3Data = function recurse(root) {

        let currentData = {
            name: "",
            children: null,
            value: 0
        };

        if (root.attributes !== undefined && root.attributes !== null) {
            currentData.name = root.attributes.TEXT;
        }

        if (root.elements.length === 0) {

            let value = parseInt(root.attributes.CREATED);
            currentData = {
                name: root.attributes.TEXT,
                value: value
            };

        } else {

            let children = [];
            for (let i = 0; i < root.elements.length; i++) {
                if (root.elements[i].name === "node") {
                    children.push(recurse(root.elements[i]));
                }
            }

            currentData = {
                name: root.attributes.TEXT,
                children: children,
            }

        }

        return currentData;
    };
    
    constructTree = () => {
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
            return (a.parent == b.parent ? (1 + sep/1.5) : 1 );
        });

        const root = d3.hierarchy(this.state.data);

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
                .attr("r", 2.5)
                .attr("fill", d => d._children ? "#555" : "#999")
                .attr("stroke-width", 10)
                .on("click", d => {
                    d.children = d.children ? null : d._children;
                    update(d);
                });

            nodeEnter.append("text")
                .attr("dy", "0.31em")
                .attr("x", d => d._children ? -6 : 6)
                .attr("text-anchor", d => d._children ? "end" : "start")
                .text(d => d.data.name)
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
                });

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
                <svg className="Viewer-svg" style={{height: window.innerHeight - 20}} id="svg">
                </svg>
            </div>
        )
    }
}

export default Viewer;