function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
    PANEL.append("h6").text("GENDER: " + result.gender);
    PANEL.append("h6").text("AGE: " + result.age);
    PANEL.append("h6").text("LOCATION: " + result.location);
    PANEL.append("h6").text("BBTYPE: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);
  });
}



function buildBarGraph(sample) {

    d3.json("samples.json").then((data)=>{
    
    var sample_data = data.samples;
    var sampledataArray = sample_data.filter(sampleObj => sampleObj.id == sample);
    var result = sampledataArray[0];
    
    var otu_ids = result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var otu_labels = result.otu_labels.slice(0,10).reverse();
    var sample_values = result.sample_values.slice(0,10).reverse();

    var trace = {
      x: sample_values,
      y: otu_ids,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    };

    var data = [trace];
 
    var layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 25, l: 200 },
      height: 450,
      width: 500
    };
  Plotly.newPlot("bar", data, layout);
  })  
}


function buildBubble(sample) {
   // Build a Bubble Chart 
  d3.json("samples.json").then((data)=>{
  
  var sample_data = data.samples;
  var sampledataArray = sample_data.filter(sampleObj => sampleObj.id == sample);
  var result = sampledataArray[0];
  
  var otu_ids = result.otu_ids.reverse();
  var otu_labels = result.otu_labels.reverse();
  var sample_values = result.sample_values.reverse();

    trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      name: "OTU ID",
      mode: 'markers',
      marker: {
        opacity: [.5],
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };
    
    var data1 = [trace1];
    
    var layout1 = {
      title: 'Bacteria in Belly Button',
    height: 550,
    width: 1200,
    xaxis: {title: 'OTU ID'},       
    };
    
    Plotly.newPlot("bubble", data1, layout1);    

  });
}


//function buildGague(sample){
  //d3.json("samples.json").then((data) => {

    //var samples = data.metadata;
    //var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //var result = sampleArray[0];

    //var trace = {

      //  value: result.wfreq,
//}
//}




function init() {
  var selector = d3.select("#selDataset");
    
  d3.json("samples.json").then((data) => {
      //console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
      selector
          .append("option")
          .text(sample)
          .property("value", sample);
        });

      const firstSample = sampleNames[0];
      buildBarGraph(firstSample);
      buildBubble(firstSample);
      buildMetadata(firstSample);
      buildGague(firstSample);
    });
  }

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildBarGraph(newSample);
  buildBubble(newSample);
  buildGague(newSample)
}

init();
buildMetadata('940');
buildBarGraph('940');
buildBubble('940');
buildGague('940');