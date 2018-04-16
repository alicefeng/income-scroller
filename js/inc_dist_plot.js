var w = 600,
	h = 600,
	padding = 40;

var formatCurrency = d3.format("$,.0f");

var data = [
	{'percentile': 10, 'income': 13608},
	{'percentile': 20, 'income': 24002},
	{'percentile': 40, 'income': 45600},
	{'percentile': 50, 'income': 59039},
	{'percentile': 60, 'income': 74869},
	{'percentile': 80, 'income': 121018},
	{'percentile': 90, 'income': 170536},
	{'percentile': 95, 'income': 225251},
];

// set up scales
var xscale = d3.scale.linear()
	.domain([0, 100])
	.range([0, w]);

var yscale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d.income; })])
	.range([h, 0]);

var rscale = d3.scale.sqrt()
	.domain([0, d3.max(data, function(d) { return d.income; })])
	.range([0, 25]);

var xAxis = d3.svg.axis()
	.scale(xscale)
	.tickValues([0, 10, 20, 40, 50, 60, 80, 90, 95, 100])
	.orient("bottom");

// var yAxis = d3.svg.axis()
// 	.scale(yscale)
// 	.orient("left");


// set up chart
var plot = d3.select("#income_plot")
	.append("svg")
		.attr("width", w + padding*2)
		.attr("height", h + padding*2)
		// .attr("preserveAspectRatio", "xMinYMin meet")
		// .attr("viewBox", "0 0 680 680")
		// .classed("svg-content", true)
	.append("g")
		.attr("transform", "translate(" + padding + "," + padding + ")");


// draw plot
	
// draw axes
plot.append("g")
  	.attr("class", "x axis")
  	.attr("transform", "translate(0," + h + ")")
  	.call(xAxis)
  .append("text")
  	.attr("transform", "translate(0, 35)")
  	.style("text-anchor", "start")
  	.text("Percent of Workers Earning Less");

plot.append("line")
	.attr("x1", 0)
	.attr("x2", w)
	.attr("y1", yscale(59039))
	.attr("y2", yscale(59039))
	.attr("stroke-dasharray", "2, 4")
	.style("stroke", "#b3b3b3");

plot.append("text")
	.attr("class", "median_label")
	.attr("x", 0)
	.attr("y", yscale(59039) + 14)
	.text("Half of all workers earned");

plot.append("text")
	.attr("class", "median_label")
	.attr("x", 0)
	.attr("y", yscale(59039) + 28)
	.text("less than this");

var thresholds = plot.selectAll(".threshold")
	.data(data)
	.enter()
  .append("g")
  	.attr("class", "threshold");

 thresholds.append("line")
	.attr("x1", function(d) { return xscale(d.percentile); })
	.attr("x2", function(d) { return xscale(d.percentile); })
	.attr("y1", function(d) { return yscale(d.income); })
	.attr("y2", h)
	.style("stroke", "#e6e6e6");

thresholds.append("circle")
	.attr("cx", function(d) { return xscale(d.percentile); })
	.attr("cy", function(d) { return yscale(d.income); })
	.attr("r", 5)
	.style("fill", "#e6e6e6");

thresholds.append("text")
	.attr("class", "plot_label")
	.attr("x", function(d) { return xscale(d.percentile); })
	.attr("y", function(d) { return yscale(d.income) - 15; })
	.text(function(d) { return formatCurrency(d.income); });
