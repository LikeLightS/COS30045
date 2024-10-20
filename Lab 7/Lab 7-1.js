
var width = 600;
var height = 400;
var margin = 50;

var w = width - margin;
var h = height - margin*2;

var dataset;

d3.csv("Unemployment_78-95.csv",function(d){
    return{
        date: new Date (+d.year, (+d.month-1)),
        number: +d.number
    };
}).then(function(data){
    dataset=data;
    lineChart(dataset);
});


function lineChart(dataset)
{
    xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) { return d.date; }),
            d3.max(dataset, function(d) { return d.date; })
        ])
        .range([0,w]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.number; })])
        .range([h,0]);

    var line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.number); });

    // Shading
    var area = d3.area()
        .x(function(d){return xScale(d.date);})
        .y0(h)
        .y1(function(d){return yScale(d.number);});

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width",width)
                .attr("height",height)
                .append("g")
                .attr("transform","translate("+margin+","+margin+")");

    svg.append("path")
        .datum(dataset)
        .attr("class","line")
        .attr("d",line)
        .attr("fill","blue");

    svg.append("path")
        .datum(dataset)
        .attr("class","area")
        .attr("d",area)
        .attr("fill","lightblue");

    var xAxis = d3.axisBottom(xScale)
                .ticks(10);
                // .tickFormat(formatTime)
                // .scale(xScale);
    var yAxis = d3.axisLeft(yScale)
                .ticks(10);

    svg.append("g")
        .attr("transform","translate(0,"+ h + ")")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("line")
        .attr("class","line halfMilMark")
        .attr("x1",0)
        .attr("y1",yScale(500000))
        .attr("x2",w)
        .attr("y2",yScale(500000))
        .attr("stroke","red")
        .attr("stroke-width",1)
        .attr("stroke-dasharray","4");

    svg.append("text")
        .attr("class","halfMilLabel")
        .attr("x", 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed")
        .attr("fill","red")
        .style("font-size","12px");
}
