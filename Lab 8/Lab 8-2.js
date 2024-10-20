
var width = 600;
var height = 400;
var margin = 50;

var w = width - margin;
var h = height - margin*2;

var color = d3.scaleQuantize()
            .range(["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"]);
var svg = d3.select("#chart")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

var projection=d3.geoMercator()
                .center([145,-36.5])
                .translate([w/2,h/2])
                .scale(2450);

var path = d3.geoPath()
            .projection(projection);

d3.csv("Resources/VIC_LGA_unemployment.csv").then(function (dataset){
    d3.json("Resources/LGA_VIC.json").then(function(json){
        for (var i = 0;i < dataset.length;i++){
            var dataLGA = dataset[i].LGA;
            var dataUnemployed = parseFloat(dataset[i].unemployed);

            for (var j=0;j < json.features.length;j++){
                var jsonLGA = json.features[j].properties.LGA_name;

                if(dataLGA === jsonLGA){
                    json.features[j].properties.unemployed = dataUnemployed;
                    break;
                }
            }
        }
        color.domain([
            d3.min(json.features, function(d) { return +d.properties.unemployed; }),
            d3.max(json.features, function(d) { return +d.properties.unemployed; })
        ]);

        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d",path)
        .attr("fill",function(d){
            var value=d.properties.unemployed;
            return value ? color(value) : "#ccc";
        });

        d3.csv("Resources/VIC_city.csv").then(function(circleData){
            svg.selectAll("circle")
                .data(circleData)
                .enter()
                .append("circle")
                .attr("cx",function(d){
                    return projection([d.lon,d.lat])[0];
                })
                .attr("cy",function(d){
                    return projection([d.lon,d.lat])[1];
                })
                .attr("r",3)
                .attr("fill","red");
        })
    });
});