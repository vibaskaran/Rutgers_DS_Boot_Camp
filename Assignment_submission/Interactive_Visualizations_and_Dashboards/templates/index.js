
// Function to generate a color 
function pickHex(color1, color2, weight) {
  console.log("inside pickHex()");
  
  var w1 = weight * 50;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
  Math.round(color1[1] * w1 + color2[1] * w2),
  Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}


// Function to add the dropdown for samples
function addDropdown() {
  console.log("inside addDropdown()");
  
  // Get the list of sample names and put into an array
  sampleNames = [];
  queryURL = 'http://localhost:5000/names';

  // Take url response and assign it to the sampleNames array
  d3.json(queryURL, function (error, response) {
    if (error) {
      console.log(error);
    }
    else {
      sampleNames = response;

      // Add each item from sampleNames as an option to dropdown  
      for (var i = 0; i < sampleNames.length; i++) {
        d3.select("#samplesDropdown").append("option")
          .attr("value", sampleNames[i]["name"])
          .text(sampleNames[i]);
      }

      // Call optionChanged with the 1st element as the default option selected
      optionChanged(sampleNames[0]);

    }
  });

}



// Function to create a default pie chart and scatter plot
function init() {
  console.log("inside init()");
  
  // Create a default pie chart which can be restyled based on option selected
  var data = [{
    values: [19, 26, 55, 88],
    labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
    text: ["A", "B", "C", "D"],
    type: "pie"
  }];

  var layout = {
    margin: {
      b: 0,
      t: 0,
      pad: 0
    },
    title: false,
    height: 375,
    width: 500
  };

  Plotly.plot("pie", data, layout);



  // Create a default scatter plot which can be restyled based on option selected
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A size: 40', 'B size: 60', 'C size: 80', 'D size: 100'],
    mode: 'markers',
    hoverinfo: 'text',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      size: [40, 60, 80, 100]
    }
  };

  var data = [trace1];

  var layout = {
    margin: {
      l: 0,
      r: 200,
      b: 0,
      t: 0,
      pad: 0
    },
    showlegend: false,
    height: 400,
    width: 1200
  };

  Plotly.newPlot('scatterPlot', data, layout);

}



// Function to restyle Pie chart and Scatter Plot
function updatePlots(newdata) {
  console.log("inside updatePlots()");
  

  // Restyle Pie chart and Scatter Plot

  // Declare variables
  scatterPlotText = [];
  scatterPlotColor = []; 
  otuDescTop10 = []; 
  otuDescAll  = [];

  // Get the description of otu_id from the otu url/endpoint
  queryURL = 'http://localhost:5000/otu';


  d3.json(queryURL, function (error, response) {
    otuDescAll = response;

    // Add description corresponding to top 10 otu_id's in an array for restyling pie
    for (var i = 0; i < 10; i++) {
      otuDescTop10.push(otuDescAll[newdata[0].otu_id[i]]);
    }

    // Add description corresponding to all otu_id's in an array for restyling scatter plot
    for (var i = 0; i < newdata[0].otu_id.length; i++) {
      scatterPlotText.push("(" + newdata[0].otu_id[i] + "," + newdata[0].sample_values[i] + ")" + "<br>" + otuDescAll[newdata[0].otu_id[i]]);
      color1 = pickHex([0, 0, 51], [51, 0, 0], ((i) / newdata[0].otu_id.length));
      color2 = 'rgb(' + color1[0] + ', ' + color1[1] + ', ' + color1[2] + ')';
      scatterPlotColor.push(color2);
    }

    // Restyle scatter plot text and marker color
    Plotly.restyle("scatterPlot", "text", [scatterPlotText]);
    Plotly.restyle("scatterPlot", "marker.color", [scatterPlotColor]);


  });

  // Get html element for pie chart
  var PIE = document.getElementById("pie");
    
  // Restyle the pie chart with top 10 otu_id's with the maximum samples  
  Plotly.restyle(PIE, "values", [[newdata[0].sample_values][0].slice(0, 10)]);
  Plotly.restyle(PIE, "labels", [[newdata[0].otu_id][0].slice(0, 10)]);
  Plotly.restyle(PIE, "text", [otuDescTop10]);


  // Restyle the scatter plot data and marker size 
  Plotly.restyle("scatterPlot", "x", [newdata[0].otu_id]);
  Plotly.restyle("scatterPlot", "y", [newdata[0].sample_values]);
  Plotly.restyle("scatterPlot", "marker.size", [newdata[0].sample_values]);

}



// Function to generate a new gauge for washing frequency
function generateNewGauge(washFreq){
  
  console.log("inside generateNewGauge()");
  
  if (washFreq > 4) {
    var level = washFreq * 20;
  }
  else if (washFreq == 4) {
    var level = washFreq * 15;
  }
  else {
    var level = washFreq * 10;
  }

  var degrees = 180 - level,
    radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [{
    type: 'scatter',
    x: [0], y: [0],
    marker: { size: 28, color: '850000' },
    showlegend: false,
    name: 'scrubs/week',
    text: washFreq,
    hoverinfo: 'text+name'
  },
  {
    values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
    rotation: 90,
    text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
        'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
        'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
        'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
        'rgba(170, 202, 42, .5)',
        'rgba(255, 255, 255, 0)']
    },
    labels: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes: [{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 450,
    width: 400,
    xaxis: {
      zeroline: false, showticklabels: false,
      showgrid: false, range: [-1, 1]
    },
    yaxis: {
      zeroline: false, showticklabels: false,
      showgrid: false, range: [-1, 1]
    }
  };

  Plotly.newPlot('gauge', data, layout);

}

// Function to update the page when dropdown selection is changed
function optionChanged(selectedOption) {

    console.log("inside optionChanged()");

    // Get metadata information for the specific sample from the metadata url/endpoint
    queryURL1 = 'http://localhost:5000/metadata/' + selectedOption;
    metaDataInfo = "";
  
    d3.json(queryURL1, function (error, response) {
      if (error) {
        console.log(error);
      }
      else {
        metaDataInfo = response;
  
        // Remove old metadata from html id #table
        d3.select("#table").selectAll("p").remove();
    
        // Add new metadata for this sample into html id #table
        for (var key in metaDataInfo) {
          if (metaDataInfo.hasOwnProperty(key)) {
            d3.select("#table").append("p")
              .text(key + " : " + metaDataInfo[key]);
          }
        }
      }
    });
  

  // Get list of otu_id's and corresponding sample_count's for the specific sample 
  // from the samples url/endpoint
  queryURL2 = 'http://localhost:5000/samples/' + selectedOption;
  otuIdAndSampleCount = [];

  d3.json(queryURL2, function (error, response) {
    if (error) {
      console.log(error);
    }
    else {
      otuIdAndSampleCount = response;
      // Call updatePlots to restyle Pie chart and Scatter Plot 
      // with otu and sample count details for this sample
      updatePlots(otuIdAndSampleCount);

    }
  });


  // Get washing frequency for the specific sample from the wfreq url/endpoint
  queryURL3 = 'http://localhost:5000/wfreq/' + selectedOption;
  washFreq = "";

  d3.json(queryURL3, function (error, response) {
    washFreq = response;
    // Call generateNewGauge to show washing frequency for this sample
    generateNewGauge(washFreq);
  });


}

// Calling init to create default Pie Chart and Scatter Plot
init();

// Calling addDropdown to crate dropdown list of samples
addDropdown();

