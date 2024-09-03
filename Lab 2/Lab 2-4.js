var w = 500;
var h = 200;
var padding = 5;

var svg = d3.select("#chart").append("svg").attr("width",w).attr("height",h);

d3.csv("Task_2_4_data.csv").then(function(data){
    wombatSighting = data;

    svg.selectAll("rect").data(wombatSighting).enter().append("rect")
    .attr("x",function(d,i){
        return i*(w/wombatSighting.length);
    })
    .attr("y",function(d){
        return h-(d.wombats*4);
    })
    .attr("width",function(d){
        return (w/wombatSighting.length)-padding;
    })
    .attr("height",function(d){
        return d.wombats*4;
    })
    .style("fill",function(d){
        return d.wombats < 10 ? "#00008B" : d.wombats < 20 ? "#0000FF" : "#ADD8E6";
    })

    svg.selectAll("text").data(wombatSighting).enter().append("text")
    .text(function(d){
        return d.wombats;
    })
    .attr("x",function(d,i){
        return i * (w / wombatSighting.length) + (w / wombatSighting.length - padding)/2;
    })
    .attr("y",function(d){
        return h-d.wombats*4-8;
    })
    .attr("font-size","15px")
    .attr("text-anchor","middle");
    })