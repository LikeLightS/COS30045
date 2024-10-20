var width = 300;
var height = 300;
var dataset = [ 5,8,6,4,10];
var outerRadius = width/2;
var innerRadius = 0;

var svg=d3.select("#chart")
            .append("svg")
            .attr("width",width)
            .attr("height",height);
var color = d3.scaleOrdinal(d3.schemeCategory10);
var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
var pie = d3.pie();
var arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class","arc")
            .attr("transform","translate("+outerRadius+","+outerRadius+")");

arcs.append("path")
    .attr("fill",function(d,i){
        return color(i);
    })
    .attr("d",arc);

// Add Text
arcs.append("text")
    .text(function(d){
        return d.value;
    })
    .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    });
