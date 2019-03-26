function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var sampleDataURL = "/metadata/" + sample; //`/samples/${sample}`
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var panelData = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    d3.json(sampleDataURL).then(function (data){
      Object.entries(data).forEach(([key, value]) => {
        panelData.append("h6").text(`${key}: ${value}`);
      })
    });


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

    // d3.json("/metadata/<sample>").then(function(metadata) {


    //   var sample = d3.select("#sample-metadata").node().value;
    //   // console.log(stock);
    //   // alert(stock);
    
    //   // clear the input value
    //   d3.select("#sample-metadata").node().value = "";
  
    //   buildCharts(sample);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartURL = "/samples/" + sample; // `/metadata/${sample}`
  d3.json(chartURL).then(function (data){

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }
    };

    var trace1 = [trace1];
    
    var layout = {
      showlegend: false
    };

    Plotly.newPlot('bubble', trace1, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var data = {
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      type: 'pie'
    };

    var layout = {
      showlegend: true
    };

    Plotly.newPlot('pie', [data], layout);

  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
