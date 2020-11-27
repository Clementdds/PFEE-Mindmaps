import React, {useEffect} from "react";
import "../Assets/Css/App.css"
import * as d3 from "d3";
import { style } from "d3";

const Viewer = ({file, nodeid}) => {

    let DisplayScore = false;
    let minDate = 0;
    let maxDate = 0;
    let actualDate = 0;

    let listOfNodeId= [];
    useEffect(() =>  {
        const jsFile = JSON.parse(file);
        const data = createD3Data(jsFile.elements[0].elements[0]);
        constructTree(data);
    }, [file, nodeid]);

    const createD3Data = (xmlTextFile) => {
        return recurseD3Data(xmlTextFile);
    };

    const recurseD3Data = function recurse(root, newColor = "", id=0) {
        let currentData = {
            name: "",
            children: null,
            value: 0,
            color:newColor,
            score:"",
            id:id,
            countBreak: 1,

        };

        if (root.attributes !== undefined && root.attributes !== null) {
            currentData.name = root.attributes.TEXT;

        }

        let tmpscore = "";
        if(root.attributes && root.attributes.SCORE != null)
        {
            tmpscore =  "\n" + root.attributes.SCORE;
        }
       
        let value = parseInt(root.attributes.MODIFIED);
        if(value === undefined)
        {
            value = parseInt(root.attributes.CREATED);
        }
        if(value < minDate || minDate === 0)
        {
            minDate = value;
            actualDate = value;
        }
        if(value > maxDate)
        {
            maxDate = value;
        }
        
        //value = new Date(value);
        if (root.elements.length === 0) {

          
           // let createDate = parseInt(root.attributes.CREATED);
            let count = CountBreakLine(root.attributes.TEXT);

            currentData = {
                name: root.attributes.TEXT,
                value: value,
                color: newColor,
                score: tmpscore,
                countBreak: count,
                id:id
            };
        } else {
            
            if(root.elements[0].attributes.COLOR != null)
            {
                newColor = root.elements[0].attributes.COLOR;
            }

            let children = [];
            for (let i = 0; i < root.elements.length; i++) {
                if (root.elements[i].name === "node") {
                    id = id + 1
                    children.push(recurse(root.elements[i], newColor, id));
                }
            }
            if(newColor === "")
            {
                newColor ="#000000"
            }
            let count = CountBreakLine(root.attributes.TEXT);
            currentData = {
                name: root.attributes.TEXT,
                value: value,
                children: children,
                color: newColor,
                score: tmpscore,
                countBreak: count,
                id:id
                
            }
        }

        return currentData;
    };

    function CountBreakLine(text)
    {
       
        if(text === undefined)
            return 1;  
        let i = 0;
        let count = 0;   
        while(i < text.length)
        {
            if(text[i] === '\n')
            {
                count++;
            }
            i++;
        }
        return count;

    };

    function GreyNode()
    {
        let allNode = d3.select("svg").select("g").select("g").selectAll("g");
        let i = 0;
        let tableau = allNode._groups[0];
        while(i <  tableau.length)
        {
            if(tableau[i].__data__.data.value > actualDate)
            {
                let circleId =  "circle" + tableau[i].id
                document.getElementById(circleId).style.fill = "grey"
                
             //   let textId = "TextValue"+tableau[i].id;
               // console.log("TextValue"+tableau[i].id)
              //  document.getElementById(textId).style.fill = "grey"
                /*
                let nbBreak = tableau[i].__data__.data.countBreak;
                let j = 0;
                while(j < nbBreak)
                {
                    let tspanId ="tspan"+tableau[i].id + j;
                    console.log(tspanId +  document.getElementById(tspanId));
                    document.getElementById(tspanId).style.fill = "grey"
                    j++;
                }*/
            }
            else{
                let circleId =  "circle" + tableau[i].id
                document.getElementById(circleId).style.fill =  tableau[i].__data__.data.color

                let nbBreak = tableau[i].__data__.data.countBreak;
                let j = 0;
                while(j < nbBreak)
                {
                    let tspanId ="tspan"+tableau[i].id + j;
                    document.getElementById(tspanId).style.fill = "#000"
                    j++;
                }
            }
          i++;
        }
    }
    
    function ReturnColorScore(score)
    {
        if(score === "")
        {
            return 'grey'
        }
        let scoreNumber = parseInt(score)
        if(scoreNumber>= 0 && scoreNumber <=4)
        {
            return  'darkred';
        }
        else if(scoreNumber>= 5 && scoreNumber <=8)
        {
            return  'red';
        }
        else if(scoreNumber>= 9 && scoreNumber <=12)
        {
            return  'gold';
        }
        else if(scoreNumber>= 13 && scoreNumber <=16)
        {
            return  'green';
        }
        else{
            return  'darkgreen';
        }
    }

    function UpdateScore()
    {
        let allNode = d3.select("svg").select("g").select("g").selectAll("g");
        let tableau = allNode._groups[0];
        let i = 0;
        while(i < tableau.length)
        {
            if(tableau[i].id === '0')
            {
                i++;
                continue;
            }

            let tmpColor = '';
            if(DisplayScore === true)
            {
                tmpColor = ReturnColorScore(tableau[i].__data__.data.score)
            }
            else{
                tmpColor = tableau[i].__data__.data.color;
            }

            let pathId =  "path" + tableau[i].id
            let circleId =  "circle" + tableau[i].id

            if(tableau[i].__data__.data.children)
            {
                document.getElementById(circleId).style.fill = tmpColor
            }
            else
            {
                document.getElementById(circleId).style.stroke = tmpColor
            }
            document.getElementById(pathId).style.stroke = tmpColor;
            i++;
        }
    }
    
    let allLink = [];
    const constructTree = (data) => {

        const margin = ({top: 10, right: 120, bottom: 10, left: 40});
        const width = window.innerWidth;

        //const offsetx = 100;
        //const offsety = window.innerHeight / 2;

        const dy = width / 4;
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
           
            let sep = b.data.countBreak;
            if(a.children != null)
            {
               sep = sep +  TotalNbChild(a);          
            }
            if(b.children != null)
            {
                let tmpSep = TotalNbChild(b)+ b.children[0].data.countBreak;
                if(tmpSep> sep)
                    sep = tmpSep
            }
            return (a.parent === b.parent ? (1 + sep/1.5) : 1 + sep );
        });

        const root = d3.hierarchy(data);

        root.x0 = dy / 2;
        root.y0 = 30;
        root.descendants().forEach((d, i) => {
            d.id = i;
            d._children = d.children;
            if (d.depth) d.children = null;
        });

        let slider = d3.select("#myRangeTime")
        .attr("type", "range")
        .attr("value", minDate)
        .attr("min", minDate)
        .attr("max", maxDate)
        .attr("step",1)
        .on('input', val => {
            let takeDate= parseInt(document.getElementById('myRangeTime').value);
            let mili = new Date(takeDate);
            let time = mili.toLocaleString();
            d3.select('p#value-time').text(time);
            actualDate = document.getElementById('myRangeTime').value;
            if(DisplayScore != true)
                GreyNode();
          })
          
        
        
        let displayScore =  d3.select('#displayScore').
            on("click", function(){
                
                DisplayScore = !DisplayScore
                UpdateScore();
                
             /*   
                update(root);*/
                console.log("display is " + d3.select(this).property("checked"))
            });

        const svg = d3.select("svg")
            .attr("viewBox", [-margin.left, -margin.top, width, dx])
            .style("font", "10px sans-serif")
            .style("user-select", "none")
            .call(d3.zoom()
            .extent([[0, 0], [width, dx]])
            .scaleExtent([0.5, 5])
            .on("zoom", function()
            {
                d3.select("g").attr("transform", d3.event.transform)
            }));

        const gLink = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5);
            
        const gNode = svg.select("g").append("g")
            .attr("cursor", "pointer")
            .attr("pointer-events","all")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 0);
            
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
                .attr("viewBox", [-margin.left, left.x - margin.top, window.innerWidth, window.innerHeight])
                .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

                
            // Update the nodes…
            const node = gNode.selectAll("g")
                .data(nodes, d => d.id);

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node.enter().append("g")
                .attr("transform", d => `translate(${source.y0},${source.x0})`)
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1)
                .attr("id", d => d.id);
             
            
           const shareButton = nodeEnter.append("svg:image")
                .attr('x', -10)
                .attr('y', 0)
                .attr('width', 10)
                .attr('height', 10)
               .attr("xlink:href", "../Ressources/Share.png")
               .on("click", d => {
                    //SHARED FUNCTION
               })


          
            nodeEnter.append("circle")
                .attr("id", d => "circle" + d.id)
                .attr("cx", d => d._children ? 0 : 1)
                .attr("r", d => d._children ? 2.5 : 1)
                .attr("stroke", d =>{
                    if(d._children)
                    {
                        return "none"
                    }
                    else{
                        if(DisplayScore === true)
                        {
                            return ReturnColorScore(d.data.score)
                        }
                        else{
                            return (d.data.color)
                        }
                    }
                    })
                .attr("stroke-width", 5)
                .style("fill", d => {
                 
                    if(d._children)
                    {
                        if(DisplayScore === true)
                        {
                            return ReturnColorScore(d.data.score)
                        }
                        else{
                            return d.data.color
                        }
                    }
                    else{
                        return  "none" 
                    }
                })
                .on("click", d => {
                    if(maxDate  != 0 && DisplayScore === false )
                    {
                        if(d.value <= actualDate)
                        {
                            d.children = d.children ? null : d._children
                        }
                    }else{
                        d.children = d.children ? null : d._children
                    } 
                 
                    update(d);
                });
            
            nodeEnter.append("text")
                .attr("id", d => "TextValue")
                .attr("dy", "0.31em")
              //  .text(d => d.data.name)
              .attr("x", d => d._children ? 10 : 10)
              .attr("y",  0)
              .each(function (d)
                {
                    var arr = d.data.name.split('\n');
                    d.data.countBreak = arr.length
                    for (let i = 0; i < arr.length; i++) {
                        d3.select(this).append("tspan")
                            .attr("id", "tspan"+d.id + i)
                            .text(arr[i])
                            .attr("dy", i ? "1.2em" : 0)
                            .attr("x", 5)
                            .attr("text-anchor", "start");
                          
                    }
                })
                //.attr("x", d => d._children ? -6 : 6)
                //.attr("y", d => d._children ? -7 : 0)
                //.attr("text-anchor", d => d._children ? "start" : "end")
                .style("fill", "black")
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
          //  .attr("text-anchor", d => d._children ? "end" : "start")
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
                .attr("id", d=>"path" + d.target.id )
                .attr("d", d => {
                    const o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })               
                .attr("stroke", function(d){ 

                    if(DisplayScore === true)
                    {
                        return ReturnColorScore(d.target.data.score)
                    }
                    else{
                        return (d.target.data.color)
                    }
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
        if(maxDate != 0)
        {
            d3.select('p#value-time').text(new Date(actualDate).toLocaleString());
        }
        else{
            document.getElementById("value-time").remove();
            document.getElementById("myRangeTime").remove();
        }
        return svg.node();     
   
    };
    return (
            <div className="Viewer-div" id="viewer_div">              
                <p id="value-time"/>              
                <input type="range" className="slider" id="myRangeTime"/>
                <input type="checkbox" id="displayScore"/>
                <svg  className = "Viewer-svg"   viewBox="0 0 30 30"   id = "svg" />
            </div>
        );
};

export default (Viewer);