var dataset = [14,5,26,23,9,25,14,9,17];
var dataset2 = [24,10,29,19,8,15,20,12,9,6,21,28];
var maxValue = 25;

var w = 500;
var h = 200;
var padding = 5;

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
.attr("fill","rgb(0,206,209)")
.on("mouseover",function(event, d){
    var xPos = parseFloat(d3.select(this).attr("x"))  + xScale.bandwidth()/2;
    var yPos = parseFloat(d3.select(this).attr("y")) + 20;

    d3.select(this)
        .transition()
        .duration(200)
        .attr("fill","Cyan")

    svg.append("text")
        .attr("id","tooltip")
        .attr("x",xPos)
        .attr("y",yPos)
        .attr("text-anchor","middle")
        .text(d);
})
.on("mouseout",function(){
    d3.select(this)
        .transition()
        .duration(200)
        .delay(50)
        .attr("fill")
        .attr("fill","rgb(0,206,209)")

    d3.select("#tooltip").remove();
});

function createDataset(){
    var newNumber = Math.floor(Math.random()*maxValue);
    dataset.push(newNumber);

    xScale.domain(d3.range(dataset.length));

    var bars = svg.selectAll("rect").data(dataset);

    bars.enter().append("rect")
        .attr("x",w)
        .attr("y",h)
        .attr("fill","rgb(0,206,209)")
        .on("mouseover",function(event, d){
            var xPos = parseFloat(d3.select(this).attr("x"))  + xScale.bandwidth()/2;
            var yPos = parseFloat(d3.select(this).attr("y")) + 20;
            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill","Cyan");

            svg.append("text")
                .attr("id","tooltip")
                .attr("x",xPos)
                .attr("y",yPos)
                .attr("text-anchor","middle")
                .text(d);
        })
        .on("mouseout",function(){
            d3.select(this)
                .transition()
                .duration(200)
                .delay(50)
                .attr("fill")
                .attr("fill","rgb(0,206,209)");

            d3.select("#tooltip").remove();
        })
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x",function(d,i){
            return xScale(i);
        })
        .attr("y",function(d) {
            return yScale(d);
        })
        .attr("width",xScale.bandwidth())
        .attr("height",function(d){
            return h-yScale(d);
        });
        
    }

d3.select(".add").on("click", function(){
    createDataset();

    svg.selectAll("rect").data(dataset)
        .transition()
        .delay(function(d,i){
            return i/dataset.length*100;
        })
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("x",function(d,i){
            return xScale(i);
        })
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){
            return h-yScale(d);
        })
        .attr("fill","rgb(0,206,209)");
});

d3.select(".remove").on("click",function(){
    dataset.shift();

    xScale.domain(d3.range(dataset.length));

    var bars = svg.selectAll("rect").data(dataset);

    bars.exit()
        .transition()
        .duration(500)
        .attr("x",w)
        .remove();

        svg.selectAll("rect").data(dataset)
        .transition()
        .delay(function(d,i){
            return i/dataset.length*100;
        })
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("x",function(d,i){
            return xScale(i);
        })
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){
            return h-yScale(d);
        })
        .attr("fill","rgb(0,206,209)");
            
    })