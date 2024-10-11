var dataset = [14,5,26,23,9,25,14,9,17];
var dataset2 = [24,10,29,19,8,15,20,12,9,6,21,28];

var w = 500;
var h = 200;
var padding = 5;

function createDataset(){
    var numValue = dataset.length;
        var maxValue = 24;

        dataset=[];

        for (var i = 0; i < numValue; i++){
            var newNumber = Math.floor(Math.random()*maxValue);
            dataset.push(newNumber);
        }
}

var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0,w])
                .paddingInner(0.05);

var yScale = d3.scaleLinear()
                .domain([0,d3.max(dataset)])
                .rangeRound([h,0]);

var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);

svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i){
    return xScale(i);
})
.attr("y",function(d){
    return yScale(d);
})
.attr("width", xScale.bandwidth())
.attr("height",function(d){
    return h-yScale(d);
})
.attr("fill","rgb(0,206,209)");

d3.select(".normal").on("click", function(){
    createDataset();

    svg.selectAll("rect").data(dataset)
        .transition()
        .delay(function(d,i){
            return i/dataset.length*100;
        })
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("height", function(d){
            return h-yScale(d);
        })
        .attr("fill","rgb(0,206,209)");
});

d3.select(".bounce").on("click", function(){
    createDataset();

    svg.selectAll("rect").data(dataset)
        .transition()
        .duration(1500)
        .ease(d3.easeBounceOut)
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("height", function(d){
            return h-yScale(d);
        })
        .attr("fill","rgb(0,206,209)");
});

d3.select(".linear").on("click", function(){
    createDataset();

    svg.selectAll("rect").data(dataset)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("height", function(d){
            return h-yScale(d);
        })
        .attr("fill","rgb(0,206,209)");
});