function buildMetadata(sample) {

    console.log(sample);
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(`/metadata/${sample}`).then(function(data) {

        console.log(data);

        var divMeta = d3.select("#sample-metadata");
        divMeta.html('');

        Object.entries(data).forEach(([key, value]) => {
            console.log(`${key}`,`${value}`);
            divMeta.append("h6").text(`${key}: ${value}`);
        });
    });

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

    d3.json(`/samples/${sample}`).then(function(data){

    console.log(data);

    let otuIds = data.otu_ids;
    let otuLabels = data.otu_labels;
    let sampleVal = data.sample_values;

    // build plot layout
    var bubble = {

        margin: { t: 0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
       };

    // organize the plot data, and attributes
    var   bubbleData = [{
       x: otuIds,
       y: sampleVal,
       text: otuLabels,
       mode: "markers",
           marker: {
            size: (sampleVal * 50),
            color: otuIds,
            colorscale: "Earth"
           }
       }];

    // show the plot
    Plotly.plot("bubble", bubbleData, bubble);

    });
  };
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
//    console.log(sampleNames)
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
  console.log(newSample);
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();