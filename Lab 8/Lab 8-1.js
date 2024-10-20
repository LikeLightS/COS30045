
var width = 600;
var height = 400;
var margin = 50;

var w = width - margin;
var h = height - margin*2;

var svg = d3.select("#chart")
            .append("svg")
            .attr("width",width)
            .attr("height",height)
            .attr("fill","grey");

var projection=d3.geoMercator()
                .center([145,-36.5])
                .translate([w/2,h/2])
                .scale(2450);

var path = d3.geoPath()
            .projection(projection);

d3.json("Resources/LGA_VIC.json").then(function(json){
    svg.selectAll("path")
     .data(json.features)
     .enter()
     .append("path")
     .attr("d",path);
})