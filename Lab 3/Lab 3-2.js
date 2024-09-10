var dataset = [
    [5,20,2],
    [480,90,3],
    [250,50,5],
    [100,33,6],
    [330,95,8],
    [410,12,6],
    [475,44,3],
    [25,67,7],
    [85,21,9],
    [220,88,2],
    [700,33,5],
    [60,440,3],
];

var padding = 10;
var w = 700+padding;
var h = 400+padding;

var xScale = d3.scaleLinear()
.domain([d3.min(dataset,function(d){
    return d[0];
}),
d3.max(dataset,function(d){
    return d[0];
})])
.range([padding,w-padding*3]);

var yScale = d3.scaleLinear()
.domain([d3.min(dataset,function(d){
    return d[0];
}),
d3.max(dataset,function(d){
    return d[0]*2;
})])
.range([padding, h-padding]);

var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
svg.selectAll("circle").data(dataset).enter().append("circle")
.attr("cx",function(d){
    return xScale(d[0])+padding;
})
.attr("cy",function(d){
    return h-yScale(d[1])*2;
})
.attr("r",function(d){
    return d[2];
})
.attr("fill","blue");

svg.selectAll("text").data(dataset).enter().append("text")
.text(function(d){
    return "("+d[0]+","+d[1]+")";
})
.attr("x",function(d){
    return xScale(d[0])+padding;
})
.attr("y",function(d){
    return h-yScale(d[1])*2-10;
})
.attr("font-size","11px")
.attr("text-anchor","middle");