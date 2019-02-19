// @TODO: YOUR CODE HERE!


// }
d3.csv('data.csv', function (error, data) {
    if (error) return console.warn(error)
    
    data.forEach(function(data) {
        data.abbr=+data.abbr
    }) 
       

    // Variables
    var body = d3.select('body')
      var margin = { top: 500, right: 500, bottom: 500, left: 500 }
      var h = 1500 - margin.top - margin.bottom
      var w = 1500 - margin.left - margin.right
      var format = d3.format('')
      
    // Scales
    var colorScale = d3.scale.category20()
    var xScale = d3.scale.linear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.poverty })]),
          d3.max([0,d3.max(data,function (d) { return d.poverty })])
          ])
      .range([0,w])
    var yScale = d3.scale.linear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.healthcare })]),
          d3.max([0,d3.max(data,function (d) { return d.healthcare })])
          ])
      .range([h,0])

      // SVG
      var svg = body.append('svg')
          .attr('height',h + margin.top + margin.bottom)
          .attr('width',w + margin.left + margin.right)
        .append('g')
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // var svg = d3.select(".chart")
    //   .append("svg")
    //   .attr("width", svgWidth)
    //   .attr("height", svgHeight);

    // var chartGroup = svg.append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`)

      // X-axis
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(format)
        .ticks(8)
        .orient('bottom')

    // Y-axis
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(format)
        .ticks(8)
        .orient('left')

    // Circles
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
      .append('circle')
        .attr('cx',function (d) { return xScale(d.poverty) })
        .attr('cy',function (d) { return yScale(d.healthcare) })
        .attr('r','5')
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill',function (d,i) { return colorScale(i) })
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',10)
            .attr('stroke-width',3)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',10)
            .attr('stroke-width',1)
        })
      .append('title') // Tooltip
        .text(function (d) { return d.abbr +
                             '\npoverty: ' + format(d.poverty) + '%' +
                             '\nhealthcare coverage: ' + format(d.healthcare) + '%' })
                             
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
      .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',50)
        .attr('x',300)
        .attr('dy','.64em')
        .style('text-anchor','end')
        .text('Poverty Rate (%)')

    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
      .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',-200)
        .attr('y',-100)
        .attr('dy','.64em')
        .style('text-anchor','end')
        .text('Lacks Healthcare (%)')
  })

  