// @TODO: YOUR CODE HERE!
function createChart() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgHeight - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("./assets/data/data.csv").then(function(newsData) {
  
      // parse data (parsed all in case new charts needed to be made next time)
      newsData.forEach(function(data) {
        data.poverty = +data.poverty,
        data.povertyMoe = +data.povertyMoe,
        data.age = +data.age,
        data.ageMoe = +data.ageMoe,
        data.income = +data.income,
        data.incomeMoe = +data.incomeMoe,
        data.healthcare = +data.healthcare,
        data.healthcareLow = +data.healthcareLow,
        data.healthcareHigh = +data.healthcareHigh,
        data.obesity = +data.obesity,
        data.obesityLow = +data.obesityLow,
        data.obesityHigh = +data.obesityHigh,
        data.smokes = +data.smokes,
        data.smokesLow = +data.smokesLow,
        data.smokesHigh = +data.smokesHigh
      });
  
    //GOING TO PLOT  POVERTY VS LACKS HEALTHCARE
     
      // create scales
      var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(newsData, d => d.poverty))
        .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(newsData, d => d.healthcare)])
        .range([height, 0]);
  
      // create axes
      var xAxis = d3.axisBottom(xLinearScale);
      var yAxis = d3.axisLeft(yLinearScale);
  
      // append axes
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
  
      chartGroup.append("g")
        .call(yAxis);


  
      // append circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(newsData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "8")
        .attr("fill", "blue")
        .attr("stroke-width", "1")
        .attr("stroke", "black");
  
      var circleLabels = chartGroup.selectAll(null).data(newsData).enter().append("text");
  
      //add abbreviations to circles
      circleLabels
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .text(function(d) { return d.abbr;})
        .attr("font-size", "8px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");

        //x axis label
       chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text("In Poverty (%)");

      //y axis label
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("font-weight", "bold")
        .text("Lacks Healthcare (%)");




    })


    
  }
  
  // When the browser loads, createChart() is called.
  createChart();
  
  // When the browser window is resized, createChart() is called.
  d3.select(window).on("resize", createChart);