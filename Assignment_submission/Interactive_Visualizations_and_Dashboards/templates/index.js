// Render buttons function
function addSampleDropdown() {

  queryURL = 'http://localhost:5000/names';
  test1 = "";
  // Fill the data arrays as a function of the selected dataset
 
  d3.json(queryURL, function(error, response) {
      if(error){
          console.log(error);
      }
      else{
    test1 = response;

    for (var i = 0; i < test1.length; i++) {
      d3.select("#selDataset").append("option")
      .attr("value", test1[i]["name"])
      .text(test1[i]);
    }
        
  }
  });

}

// function optionChanged(vars) {
//     console.log(vars);
//     myVar = location.href='http://localhost:5000/metadata/'+vars;
//     // myVar = metadata(vars);
//     console.log(myVar+":::::::::::::::::::::::::::::::::::::::::::::::: from JS");
//     // return vars
// }


// Render Buttons
addSampleDropdown();
// myFunc(vars);


function init() {
    var data = [{
      values: [19, 26, 55, 88],
      labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
      text: ["A","B","C","D"],
      // textinfo: 'values',
      type: "pie"
    }];
  
    var layout = {
      height: 500,
      width: 500
    };
  
    Plotly.plot("pie", data, layout);
    // Plotly.plot("pie", data);




    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      text: ['A size: 40', 'B size: 60', 'C size: 80', 'D size: 100'],
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: [40, 60, 80, 100]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1000
    };
    
    Plotly.newPlot('myDiv', data, layout);





    // Enter a speed between 0 and 180
    var var123 = 0;
    if (var123>4){
    var level = var123 *20;
  }
  else if(var123==4){
    var level = var123 *15;
  }
  else{
    var level = var123 *10;
  }
    
// Trig to calc meter point
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
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  // text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",""],
  text: ["8-9","7-8","6-7","5-6","4-5","3-4","2-3","1-2","0-1",""],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
  height: 600,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};
console.log(path);
Plotly.newPlot('gauge1', data, layout);

  }
  
  function updatePie(newdata) {
    // YOUR CODE HERE
    // Use `Plotly.restyle` to update the pie chart with the newdata array
    var LINE = document.getElementById("pie");
    
    var layout = {
      height: 600,
      width: 800
    };
    
    one = [];
    // console.log("one");

    queryURL = 'http://localhost:5000/otu';
    test11 = "";
    // Fill the data arrays as a function of the selected dataset
   
    d3.json(queryURL, function(error, response) {
              test11 = response;
  
              for(var i=0;i< newdata[0].otu_id.length;i++){
                
                one.push(test11[newdata[0].otu_id[i]]);
          
              }
                    
    });
  
    console.log("updatePlotly");
    // console.log(data1[0].otu_id);
    // Plotly.plot("pie", newdata, layout);
    // Plotly.restyle(LINE, "data", [newdata]);
    Plotly.restyle(LINE, "values", [newdata[0].sample_values]);
    Plotly.restyle(LINE, "labels", [newdata[0].otu_id]);
    Plotly.restyle(LINE, "text", [one]);
    // Plotly.relayout("pie", newdata, layout);

    

    Plotly.restyle("myDiv", "x", [newdata[0].otu_id]);
    Plotly.restyle("myDiv", "y", [newdata[0].sample_values]);
    Plotly.restyle("myDiv", "marker.size", [newdata[0].sample_values]);
    Plotly.restyle("myDiv", "marker.color", [newdata[0].otu_id]);
    // Plotly.restyle("myDiv", "text", [["AA","BB","CC","DD"]]);
    Plotly.restyle("myDiv", "text", [[one]]);

    console.log("-------$$$$");
    console.log(newdata[1]);
    console.log("-------$$$$");
    
    var var12345 = newdata[1]
    if (var12345>4){
      var level = var12345 *20;
    }
    else if(var12345==4){
      var level = var12345 *15;
    }
    else{
      var level = var12345 *10;
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
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
x: [0], y:[0],
 marker: {size: 28, color:'850000'},
 showlegend: false,
 name: 'speed',
 text: level,
 hoverinfo: 'text+name'},
{ values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
rotation: 90,
// text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",""],
text: ["8-9","7-8","6-7","5-6","4-5","3-4","2-3","1-2","0-1",""],
textinfo: 'text',
textposition:'inside',
marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                      'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                      'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                      'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                      'rgba(170, 202, 42, .5)',
                      'rgba(255, 255, 255, 0)']},
labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
hoverinfo: 'label',
hole: .5,
type: 'pie',
showlegend: false
}];

var layout = {
shapes:[{
   type: 'path',
   path: path,
   fillcolor: '850000',
   line: {
     color: '850000'
   }
 }],
title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
height: 600,
width: 400,
xaxis: {zeroline:false, showticklabels:false,
          showgrid: false, range: [-1, 1]},
yaxis: {zeroline:false, showticklabels:false,
          showgrid: false, range: [-1, 1]}
};
console.log(path);
Plotly.newPlot('gauge1', data, layout);

// console.log(path);

// var update = {'marker':{color: orgColors, size:16}};
// Plotly.restyle('gauge1', update);

// Plotly.restyle("gauge1", "text", [["8-9","7-8","6-7","5-6","4-5","3-4","2-3","1-2","0-1",""]]);
// Plotly.restyle("gauge1", "path", ['M -.0 -0.025 L .0 0.025 L 0.25000000000000006 0.4330127018922193 Z']);

  }
  

  function optionChanged(dataset) {
    // YOUR CODE HERE
    // create a select statement to select different data arrays (YOUR CHOICE)
    // whenever the dataset parameter changes. This function will get called
    // from the dropdown event handler.
    var values = [];
    console.log("optionChanged: ",dataset);
    queryURL = 'http://localhost:5000/samples/'+dataset;
    console.log("optionChanged: ",queryURL);
    data1 = "";
    // Fill the data arrays as a function of the selected dataset

    queryURL2 = 'http://localhost:5000/wfreq/'+dataset;
    test11111 = "";
    // Fill the data arrays as a function of the selected dataset
   
    d3.json(queryURL, function(error, response) {
        if(error){
            console.log(error);
        }
        else{
      data1 = response;
      console.log(data1[0].otu_id);
      console.log(data1[0].sample_values);

      d3.json(queryURL2, function(error, response) {
        test11111 = response;
        console.log(test11111);
        data1.push(test11111);
        updatePie(data1);
        
              });   
  
      
    }
    });


    // console.log("optionChanged1: ",dataset);
    queryURL1 = 'http://localhost:5000/metadata/'+dataset;
    // console.log("optionChanged1: ",queryURL1);
    data2 = "";
    // Fill the data arrays as a function of the selected dataset
   
    d3.json(queryURL1, function(error, response) {
        if(error){
            console.log(error);
        }
        else{
      data2 = response;

      d3.select("#table1").selectAll("p").remove();
      
      for (var key in data2) {
        
        if (data2.hasOwnProperty(key)) {
          d3.select("#table1").append("p")
          .text(key + " : " + data2[key]);
    
        }
      }
      

    }
    });


  }
  
  init();
  