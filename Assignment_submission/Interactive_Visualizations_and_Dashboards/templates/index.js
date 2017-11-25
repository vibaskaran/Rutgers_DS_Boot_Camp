function pickHex(color1, color2, weight) {
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}


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

    // console.log("printing here ..");
    // console.log(test1[0]);
    // console.log("printing here ..");
    optionChanged(test1[0]);
    
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
      margin: {
        // l: 0,
        // r: 0,
        b: 0,
        t: 0,
        pad: 0
      },
      title: false,
      height: 375,
      width: 500
    };
  
    Plotly.plot("pie", data, layout);
    // Plotly.plot("pie", data, layout, {displayModeBar: false});
    // Plotly.plot("pie", data);




    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      text: ['A size: 40', 'B size: 60', 'C size: 80', 'D size: 100'],
      mode: 'markers',
      hoverinfo: 'text',
      colorscale: 'Earth',
      marker: {

        // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        // size: [40, 60, 80, 100]
        // color: ['rgb(0, 0, 51)', 'rgb(0, 51, 51)',  'rgb(0, 51, 0)', 'rgb(51, 51, 0)'],
        // size: [40, 60, 80, 100]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      // title: 'Bubble Chart Hover Text',
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
  labels: ['8', '7', '6', '5', '4', '3', '2', '1', '0',''],
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
    two = [];
    three = [];
    // console.log("one");

    queryURL = 'http://localhost:5000/otu';
    test11 = "";
    // Fill the data arrays as a function of the selected dataset
   
    d3.json(queryURL, function(error, response) {
              test11 = response;
  
              // for(var i=0;i< newdata[0].otu_id.length;i++){
                for(var i=0;i< 10;i++){
                  
                one.push(test11[newdata[0].otu_id[i]]);
                
              }
              
    });

    d3.json(queryURL, function(error, response) {
      test11 = response;
      console.log(newdata[0].otu_id.length);
      
      for(var i=0;i< newdata[0].otu_id.length;i++){
          
        two.push("("+newdata[0].otu_id[i]+","+newdata[0].sample_values[i]+")"+"<br>"+test11[newdata[0].otu_id[i]]);          
     
        color1 = pickHex([0,0,51], [51,0,0], ((i)/newdata[0].otu_id.length));
        color2 = 'rgb(' + color1[0] +', '+color1[1] +', '+color1[2] +')'; 
        three.push(color2);
     
      }

      four = ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'];
      Plotly.restyle("myDiv", "text", [two]);
     
      // Plotly.restyle("myDiv", "marker.color", [four]);
      // Plotly.restyle("myDiv", "marker.color", [four]);
      
      console.log("color11111");
      console.log(three);
      console.log(four);
      console.log("color11111");
    
});

    // for(var i=0;i< 10;i++){
      
    //   console.log([one[i]]);
    //   console.log("two..." + two[i]);
    // }
    console.log("updatePlotly");
    console.log("new one..");
    console.log([newdata[0].otu_id][0].slice(0,10));
    console.log("new one..");
    // console.log(data1[0].otu_id);
    // Plotly.plot("pie", newdata, layout);
    // Plotly.restyle(LINE, "data", [newdata]);

    // Plotly.restyle(LINE, "values", [newdata[0].sample_values]);
    // Plotly.restyle(LINE, "labels", [newdata[0].otu_id]);

    Plotly.restyle(LINE, "values", [[newdata[0].sample_values][0].slice(0,10)]);
    Plotly.restyle(LINE, "labels", [[newdata[0].otu_id][0].slice(0,10)]);
    Plotly.restyle(LINE, "text", [one]);

    // Plotly.relayout("pie", newdata, layout);

    

    Plotly.restyle("myDiv", "x", [newdata[0].otu_id]);
    Plotly.restyle("myDiv", "y", [newdata[0].sample_values]);
    Plotly.restyle("myDiv", "marker.size", [newdata[0].sample_values]);
    Plotly.restyle("myDiv", "colorscale", 'Earth');
    // Plotly.restyle("myDiv", "marker.color", [newdata[0].otu_id]);

    // Plotly.restyle("myDiv", "text", [["AA","BB","CC","DD"]]);
    // Plotly.restyle("myDiv", "text", [two]);

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
 name: 'scrubs/week',
 text: var12345,
//  text: level,
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
labels: ['9','8', '7', '6', '5', '4', '3', '2', '1', '0'],
// labels: 'text',
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
height: 450,
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

      
      console.log("this one....");
      console.log(data1[0].otu_id);
      console.log("this one....");
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
  