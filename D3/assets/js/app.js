// set up chart

var svgWidth = 1000;
var svgHeight = 800;

var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create an SVG wrapper

var svg = d3
.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("tranform", `translate(${margin.left}, ${margin.top})`);

// import data from data.csv file
var csvFile = "assets/data/data.csv"

d3.csv(csvFile).then(successful, failure);

function failure(error) {
    throw error;
}

function successful(censusData) {
    censusData.map(function (data) {
    data.poverty = +data.poverty;
    data.obesity = +data.obesity; 
});

console.log(censusData);

var xTimeScale = d3.scaleTime()
    .domain(d3.extent(censusData, d => d.poverty))
    .range([height, 0]);

var yLinearScale = d3.scaleLinear()
    .domain([19, d3.max(censusData, d => d.obesity) * 1.05])
    .range([height, 0]);

// create axes

var bottomAxis = d3.axisBottom(xTimeScale).ticks(7);
var leftAxis = d3.axisLeft(yLinearScale);

// append the axes to chartGroup

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    // .attr("transform", `translate(${width}), ${height}`)
    .call(leftAxis).attr("transform", `translate(60,0)`);

// create circles for scatter plot

var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xTimeScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "13")
    .attr("fill", "gray")
    .attr("opacity", ".75")

chartGroup.selectAll()
    .data(censusData)
    .enter()
    .append("text")
    .attr("x", d => xTimeScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));

// Create axes labels

chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", margin.left - 90)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "aText")
    .text("Obesity (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "aText")
    .text("In Poverty (%)");

// tool tip

var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .html(function (d) {
      return (`${d.state}<br>Poverty: ${d.poverty}%<br>Obesity: ${d.obesity}% `);
    });

chartGroup.call(toolTip);
circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function (data) {
      toolTip.hide(data);
    });
}

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////***** NEVER COULD GET THE INTERACTIVE CHART TO WORK***********////
// Here's the code that I tried out but could never get it to work
// or could get it to show on the svg

// My thought process was to create x and y labels for each data and
// then use a classes for active and inactive. So you would have each
// get activated by on click. You would also have to set an initial
// value for each x and y axis variable from the census data. So, that 
// would be currentX and currentY or something like that. Again, just
// couldn't figure it out.

// svg.append("g").attr("class", "xText");
// var xText = d3.select(".xText");

// // Transform to adjust for xText
// var bottomX =  ?????????; /// could never figure this out to it to show;
// var bottomY = ???????????; /// couldn't figure it out to show;
// xText.attr("transform",`translate(${bottomX}, ${bottomY})`);

// // x-axis text
// xText.append("text")
//     .attr("y", -25)
//     .attr("data-name", "poverty")
//     .attr("data-axis", "x")
//     .attr("class","aText active x")
//     .text("Poverty (%)");

// xText.append("text")
//     .attr("y", 0)
//     .attr("data-name", "age")
//     .attr("data-axis", "x")
//     .attr("class","aText inactive x")
//     .text("Age (Median)");

// xText.append("text")
//     .attr("y", 25)
//     .attr("data-name", "income")
//     .attr("data-axis", "x")
//     .attr("class","aText inactive x")
//     .text("Household Income (Median)");

// // y-axis (a second g tag)
// svg.append("g").attr("class", "yText");
// var yText = d3.select(".yText");

// // Transform to adjust for yText
// var leftX = ; /// couldn't figure it out to show;
// var leftY = ; /// couldn't figure it out to show;
// yText.attr("transform",`translate(${leftX}, ${leftY})rotate(-90)`);

// // Build yText details (css class)
// yText .append("text")
//     .attr("y", -25)
//     .attr("data-name", "obesity")
//     .attr("data-axis", "y")
//     .attr("class", "aText active y")
//     .text("Obesity (%)");

// yText .append("text")
//     .attr("y", 0)
//     .attr("data-name", "smokes")
//     .attr("data-axis", "y")
//     .attr("class", "aText inactive y")
//     .text("Smoking (%)");

// yText .append("text")
//     .attr("y", 25)
//     .attr("data-name", "healthcare")
//     .attr("data-axis", "y")
//     .attr("class", "aText inactive y")
//     .text("Lacks Healthcare (%)");

//  // Update upon axis option clicked
//  function  labelUpdate(q, clickText) {
//     // Switch active to inactive
//     d3.selectAll(".aText")
//         .filter("." + q)
//         .filter(".active")
//         .classed("active", false)
//         .classed("inactive", true);

//     // switch the text just clicked to active
//     clickText.classed("inactive", false).classed("active", true);
//     }

//     // update function upon axis option clicked
//     function  labelUpdate(axis, clickText) {
//         // Switch active to inactive
//         d3.selectAll(".aText")
//             .filter("." + axis)
//             .filter(".active")
//             .classed("active", false)
//             .classed("inactive", true);
    
//         // switch the text just clicked to be active
//         clickText.classed("inactive", false).classed("active", true);
//         }

//     // Scatter plot 
//     var xScale = d3 
//         .scaleLinear()
//         .domain(d3.extent(censusData, d => d.currentX))//insert census variable))
//         .range([height, 0])

//     var yScale = d3
//         .scaleLinear()
//         .domain(d3.extent(censusData, d => d.currentY)) //insert census variable))
//         .range([height 0])

//     // Create axes
//     var xAxis = d3.axisBottom(xScale);
//     var yAxis = d3.axisLeft(yScale);

//     // append axis to the svg as group elements
//     chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//     chartGroup.append("g")
//     // .attr("transform", `translate(${width}), ${height}`)
//     .call(leftAxis).attr("transform", `translate(60,0)`);

//     var allCircles = chartGroup
//         .selectAll("g allCircles")
//         .data(censusData)
//         .enter();

//     allCircles.append("circle")
//         .attr("cx", function(d) {
//             return xScale(d[currentX]);
//         })
//         .attr("cy", function(d) {
//             return yScale(d[currentY]);
//         })
//                 })
//         .on("mouseover", function(d) {
//             // Show tooltip when mouse is on circle
//             toolTip.show(d, this);
//             // Highlight circle border
//             d3.select(this)
//                 .style("stroke", "gray");
//         })
//         .on("mouseout", function (d) {
//             // Remove the tooltip
//             toolTip.hide(d);
//             d3.select(this)
//                 .style("stroke", "light gray")
//         });

//         // with the circles apply state text?
//         allCircles
//             .append("text")
//             .attr("class", "stateText")
//             .attr("dx", function(d) {
//                return xScale(d[currentX]);
//             })
//             .text(function(d) {
//                 return d.abbr;
//               })

//             .on("mouseover", function(d) {
//                 toolTip.show(d);
//                 d3.select("." + d.abbr)
//                     .style("stroke", "gray");
//             })

//             .on("mouseout", function(d) {
//                 toolTip.hide(d);
//                 d3.select("." + d.abbr)
//                     .style("stroke", "light gray");
//             });

//           // Dynamic graph on click
//           d3.selectAll(".aText").on("click", function() {
//               var self = d3.select(this)

//               // Select inactive
//               if (self.classed("inactive")) {
//                 // Obtain name and axis saved in the label
//                 var axis = self.attr("data-axis")
//                 var name = self.attr("data-name")

//                 if (axis === "x") {
//                   currentX = name;

//                   circlesGroup.select(".xAxis")
//                         .transition()
//                         .duration(800)
//                         .call(xAxis);
                  
//                   // Update location of the circles
//                   d3.selectAll("circle").each(function() {
//                     d3.select(this)
//                         .transition()
//                         .duration(800)
//                         .attr("cx", function(d) {
//                             return xScale(d[currentX])                
//                         });
//                   });   

//                   d3.selectAll(".stateText").each(function() {
//                     d3.select(this)
//                         .transition()
//                         .duration(800)
//                         .attr("dx", function(d) {
//                             return xScale(d[currentX])                          
//                         });
//                   });          
//                   // Update
//                   labelUpdate(axis, self);
//                 }

//                  // Update for Y axis selection 
//                 else {
//                   currentY = name;

//                   circlesGroup.select(".yAxis")
//                         .transition()
//                         .duration(800)
//                         .call(yAxis);

//                   // Update location of the circles
//                   d3.selectAll("circle").each(function() {
//                     d3.select(this)
//                         .transition()
//                         .duration(800)
//                         .attr("cy", function(d) {
//                             return yScale(d[currentY])                
//                         });                       
//                   });   

//                   d3.selectAll(".stateText").each(function() {
//                       d3.select(this)
//                         .transition()
//                         .duration(800)
//                         .attr("dy", function(d) {
//                            // Center text
//                             return yScale(d[currentY]);                          
//                         });
//                   });

   