// const width = 750;
// const height = 600;

// // Create an SVG element to hold the map
// const svg = d3.select("#map").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("background-color", "#b0e0e6")
//     .call(d3.zoom().on("zoom", (event) => {
//         svg.attr("transform", event.transform);
//     }))
//     .append("g");

// // Define a projection
// const projection = d3.geoAlbersUsa()
//     .scale(1000)
//     .translate([width / 2, height / 2]);

// const path = d3.geoPath()
//     .projection(projection);

// const petOwnershipData = {};

// // Define a color scale
// const colorScale = d3.scaleSequential()
//     .domain([0, 100]) 
//     .interpolator(d3.interpolateGreens);

// // Create a tooltip element
// const tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip");

// d3.csv('pet_ownership.csv').then(data => {
//     data.forEach(d => {
//         petOwnershipData[d.State.toLowerCase()] = {
//             total: +d.PetOwnershipRate,
//             dog: +d.DogOwnershipRate,
//             cat: +d.CatOwnershipRate
//         };
//     });

//     console.log("Pet Ownership Data:", petOwnershipData);

//     loadAllStates();
// });

// document.getElementById('stateSelect').addEventListener('change', function() {
//     const selectedState = this.value;

//     if (selectedState === 'all') {
//         loadAllStates();
//     } else {
//         loadState(selectedState);
//     }
// });

// // load one state
// function loadState(stateFile) {
//     d3.json(stateFile).then(geojson => {
//         svg.selectAll("path").remove(); // Clear previous paths
//         svg.selectAll("text").remove(); // Clear previous labels

//         if (geojson.type === 'FeatureCollection') {
//             svg.selectAll("path")
//                 .data(geojson.features)
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("stroke", "#000")
//                 .attr("fill", d => {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                 })
//                 .on("mouseover", function(event, d) {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     if (stateData) {
//                         tooltip.html(
//                             `<strong>${d.properties.name}</strong><br>
//                              Pet Ownership Rate: ${stateData.total}%<br>
//                              Dog Ownership Rate: ${stateData.dog}%<br>
//                              Cat Ownership Rate: ${stateData.cat}%`
//                         );
//                         tooltip.style("opacity", "1").style("visibility", "visible");
//                     }
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", function() {
//                             const centroid = path.centroid(d);
//                             return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
//                         })
//                         .attr("stroke", "#ff0")
//                         .attr("stroke-width", "2")
//                         .attr("fill", d => colorScale(petOwnershipData[d.properties.name.toLowerCase()].total * 1.1));
//                 })
//                 .on("mousemove", function(event) {
//                     tooltip.style("top", (event.pageY - 10) + "px")
//                            .style("left", (event.pageX + 10) + "px");
//                 })
//                 .on("mouseout", function(d) {
//                     tooltip.style("opacity", "0").style("visibility", "hidden");
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", "translate(0, 0) scale(1)")
//                         .attr("stroke", "#000")
//                         .attr("stroke-width", "1")
//                         .attr("fill", d => {
//                             const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                             return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                         });
//                 });

//             svg.selectAll("text")
//                 .data(geojson.features)
//                 .enter().append("text")
//                 .attr("x", d => path.centroid(d)[0])
//                 .attr("y", d => path.centroid(d)[1])
//                 .attr("text-anchor", "middle")
//                 .attr("font-size", "10px")
//                 .attr("fill", "black")
//                 .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
//         } else if (geojson.type === 'Feature') {
//             svg.selectAll("path")
//                 .data([geojson])
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("stroke", "#000")
//                 .attr("fill", d => {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                 })
//                 .on("mouseover", function(event, d) {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     if (stateData) {
//                         tooltip.html(
//                             `<strong>${d.properties.name}</strong><br>
//                              Pet Ownership Rate: ${stateData.total}%<br>
//                              Dog Ownership Rate: ${stateData.dog}%<br>
//                              Cat Ownership Rate: ${stateData.cat}%`
//                         );
//                     } else {
//                         tooltip.html(
//                             `<strong>${d.properties.name}</strong><br>
//                              Pet Ownership Rate: N/A<br>
//                              Dog Ownership Rate: N/A<br>
//                              Cat Ownership Rate: N/A`
//                         );
//                     }
//                     tooltip.style("opacity", "1").style("visibility", "visible");
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", function() {
//                             const centroid = path.centroid(d);
//                             return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
//                         })
//                         .attr("stroke", "#ff0")
//                         .attr("stroke-width", "2")
//                         .attr("fill", d => stateData ? colorScale(stateData.total * 1.1) : "#cfcd99");
//                 })
//                 .on("mousemove", function(event) {
//                     tooltip.style("top", (event.pageY - 10) + "px")
//                            .style("left", (event.pageX + 10) + "px");
//                 })
//                 .on("mouseout", function(d) {
//                     tooltip.style("opacity", "0").style("visibility", "hidden");
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", "translate(0, 0) scale(1)")
//                         .attr("stroke", "#000")
//                         .attr("stroke-width", "1")
//                         .attr("fill", d => {
//                             const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                             return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                         });
//                 });                

//             svg.selectAll("text")
//                 .data([geojson])
//                 .enter().append("text")
//                 .attr("x", d => path.centroid(d)[0])
//                 .attr("y", d => path.centroid(d)[1])
//                 .attr("text-anchor", "middle")
//                 .attr("font-size", "10px")
//                 .attr("fill", "black")
//                 .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
//         }
//     }).catch(error => {
//         console.error("Error loading the GeoJSON data:", error); 
//     });
// }

// // load all states
// function loadAllStates() {
//     const stateFiles = [
//         "alabama.geojson",
//         "alaska.geojson",
//         "arizona.geojson",
//         "arkansas.geojson",
//         "california.geojson",
//         "colorado.geojson",
//         "connecticut.geojson",
//         "delaware.geojson",
//         "florida.geojson",
//         "georgia.geojson",
//         "hawaii.geojson",
//         "idaho.geojson",
//         "illinois.geojson",
//         "indiana.geojson",
//         "iowa.geojson",
//         "kansas.geojson",
//         "kentucky.geojson",
//         "louisiana.geojson",
//         "maine.geojson",
//         "maryland.geojson",
//         "massachusetts.geojson",
//         "michigan.geojson",
//         "minnesota.geojson",
//         "mississippi.geojson",
//         "missouri.geojson",
//         "montana.geojson",
//         "nebraska.geojson",
//         "nevada.geojson",
//         "new hampshire.geojson",
//         "new jersey.geojson",
//         "new mexico.geojson",
//         "new york.geojson",
//         "north carolina.geojson",
//         "north dakota.geojson",
//         "ohio.geojson",
//         "oklahoma.geojson",
//         "oregon.geojson",
//         "pennsylvania.geojson",
//         "rhode island.geojson",
//         "south carolina.geojson",
//         "south dakota.geojson",
//         "tennessee.geojson",
//         "texas.geojson",
//         "utah.geojson",
//         "vermont.geojson",
//         "virginia.geojson",
//         "washington.geojson",
//         "west virginia.geojson",
//         "wisconsin.geojson",
//         "wyoming.geojson"
//     ];

//     let allFeatures = [];

//     stateFiles.forEach((file, index) => {
//         d3.json(file).then(geojson => {
//             if (geojson.type === 'FeatureCollection') {
//                 allFeatures = allFeatures.concat(geojson.features);
//             } else if (geojson.type === 'Feature') {
//                 allFeatures.push(geojson);
//             }

//             if (index === stateFiles.length - 1) { // Check if it's the last file
//                 svg.selectAll("path").remove(); 
//                 svg.selectAll("text").remove(); // Clear previous labels

//                 svg.selectAll("path")
//                     .data(allFeatures)
//                     .enter().append("path")
//                     .attr("d", path)
//                     .attr("stroke", "#000")
//                     .attr("fill", d => {
//                         const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                         return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                     })
//                     .on("mouseover", function(event, d) {
//                         const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                         if (stateData) {
//                             tooltip.html(
//                                 `<strong>${d.properties.name}</strong><br>
//                                  Pet Ownership Rate: ${stateData.total}%<br>
//                                  Dog Ownership Rate: ${stateData.dog}%<br>
//                                  Cat Ownership Rate: ${stateData.cat}%`
//                             );
//                         } else {
//                             tooltip.html(
//                                 `<strong>${d.properties.name}</strong><br>
//                                  Pet Ownership Rate: N/A<br>
//                                  Dog Ownership Rate: N/A<br>
//                                  Cat Ownership Rate: N/A`
//                             );
//                         }
//                         tooltip.style("opacity", "1").style("visibility", "visible");
//                         d3.select(this)
//                             .transition()
//                             .duration(200)
//                             .attr("transform", function() {
//                                 const centroid = path.centroid(d);
//                                 return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
//                             })
//                             .attr("stroke", "#ff0")
//                             .attr("stroke-width", "2")
//                             .attr("fill", d => stateData ? colorScale(stateData.total * 1.1) : "#cfcd99");
//                     })
//                     .on("mousemove", function(event) {
//                         tooltip.style("top", (event.pageY - 10) + "px")
//                                .style("left", (event.pageX + 10) + "px");
//                     })
//                     .on("mouseout", function(d) {
//                         tooltip.style("opacity", "0").style("visibility", "hidden");
//                         d3.select(this)
//                             .transition()
//                             .duration(200)
//                             .attr("transform", "translate(0, 0) scale(1)")
//                             .attr("stroke", "#000")
//                             .attr("stroke-width", "1")
//                             .attr("fill", d => {
//                                 const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                                 return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                             });
//                     });                    

//                 svg.selectAll("text")
//                     .data(allFeatures)
//                     .enter().append("text")
//                     .attr("x", d => path.centroid(d)[0])
//                     .attr("y", d => path.centroid(d)[1])
//                     .attr("text-anchor", "middle")
//                     .attr("font-size", "10px")
//                     .attr("fill", "black")
//                     .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
//             }
//         }).catch(error => {
//             console.error(`Error loading the GeoJSON data for ${file}:`, error); 
//         });
//     });
// }






















// const width = 750;
// const height = 600;


// const svg = d3.select("#map").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("background-color", "#b0e0e6")
//     .call(d3.zoom().on("zoom", (event) => {
//         svg.attr("transform", event.transform);
//     }))
//     .append("g");

// const projection = d3.geoAlbersUsa()
//     .scale(1000)
//     .translate([width / 2, height / 2]);

// const path = d3.geoPath().projection(projection);

// const petOwnershipData = {};

// const colorScale = d3.scaleSequential()
//     .domain([0, 100]) 
//     .interpolator(d3.interpolateGreens);

// const tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip");

// d3.csv('pet_ownership.csv').then(data => {
//     data.forEach(d => {
//         petOwnershipData[d.State.toLowerCase()] = {
//             total: +d.PetOwnershipRate,
//             dog: +d.DogOwnershipRate,
//             cat: +d.CatOwnershipRate
//         };
//     });

//     console.log("Pet Ownership Data:", petOwnershipData);

//     loadAllStates();
// });

// document.getElementById('stateSelect').addEventListener('change', function() {
//     const selectedState = this.value;

//     if (selectedState === 'all') {
//         loadAllStates();
//     } else {
//         loadState(selectedState);
//     }
// });

// function loadState(stateFile) {
//     d3.json(stateFile).then(geojson => {
//         svg.selectAll("path").remove(); 
//         svg.selectAll("text").remove();

//         if (geojson.type === 'FeatureCollection') {
//             svg.selectAll("path")
//                 .data(geojson.features)
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("stroke", "#000")
//                 .attr("fill", d => {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     return stateData ? colorScale(stateData.total) : "#cfcd99"; 
//                 })
//                 .on("mouseover", function(event, d) {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     if (stateData) {
//                         tooltip.transition().duration(200).style("opacity", 0.9).style("visibility", "visible");
//                         tooltip.html(`${d.properties.name}<br>Pet Ownership Rate: ${stateData.total}%<br>Dog Ownership Rate: ${stateData.dog}%<br>Cat Ownership Rate: ${stateData.cat}%`)
//                             .style("left", (event.pageX + 5) + "px")
//                             .style("top", (event.pageY - 28) + "px");
//                     }
//                 })
//                 .on("mouseout", function() {
//                     tooltip.transition().duration(500).style("opacity", 0).style("visibility", "hidden");
//                 });
//         }
//     });
// }

// function loadAllStates() {
//     d3.json('us-states.geojson').then(geojson => {
//         svg.selectAll("path").remove();
//         svg.selectAll("text").remove();

//         svg.selectAll("path")
//             .data(geojson.features)
//             .enter().append("path")
//             .attr("class", "state")
//             .attr("d", path)
//             .attr("stroke", "#000")
//             .attr("fill", d => {
//                 const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                 return stateData ? colorScale(stateData.total) : "#cfcd99";
//             })
//             .on("mouseover", function(event, d) {
//                 const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                 if (stateData) {
//                     tooltip.transition().duration(200).style("opacity", 0.9).style("visibility", "visible");
//                     tooltip.html(`${d.properties.name}<br>Pet Ownership Rate: ${stateData.total}%<br>Dog Ownership Rate: ${stateData.dog}%<br>Cat Ownership Rate: ${stateData.cat}%`)
//                         .style("left", (event.pageX + 5) + "px")
//                         .style("top", (event.pageY - 28) + "px");
//                 }
//             })
//             .on("mouseout", function() {
//                 tooltip.transition().duration(500).style("opacity", 0).style("visibility", "hidden");
//             });
//     });
// }

// const margin = { top: 30, right: 30, bottom: 70, left: 60 };
// const chartWidth = 800 - margin.left - margin.right;
// const chartHeight = 500 - margin.top - margin.bottom;

// const svgChart = d3.select("#barChart")
//     .attr("width", chartWidth + margin.left + margin.right)
//     .attr("height", chartHeight + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleBand()
//     .range([0, chartWidth])
//     .padding(0.1);

// const y = d3.scaleLinear()
//     .range([chartHeight, 0]);

// svgChart.append("g")
//     .attr("transform", `translate(0,${chartHeight})`)
//     .attr("class", "x-axis");

// svgChart.append("g")
//     .attr("class", "y-axis");

// d3.select("#catImage").on("mouseover", () => updateBarChart("cat"));
// d3.select("#dogImage").on("mouseover", () => updateBarChart("dog"));

// function updateBarChart(petType) {
//     const data = Object.entries(petOwnershipData).map(([state, rates]) => ({
//         state: state.charAt(0).toUpperCase() + state.slice(1),
//         rate: rates[petType]
//     }));

//     x.domain(data.map(d => d.state));
//     y.domain([0, d3.max(data, d => d.rate)]);

//     svgChart.selectAll(".bar").remove();

//     svgChart.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", d => x(d.state))
//         .attr("width", x.bandwidth())
//         .attr("y", d => y(d.rate))
//         .attr("height", d => chartHeight - y(d.rate))
//         .attr("fill", petType === "cat" ? "#ffb6c1" : "#add8e6");

//     svgChart.select(".x-axis").call(d3.axisBottom(x))
//         .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-0.8em")
//         .attr("dy", "-0.55em")
//         .attr("transform", "rotate(-65)");

//     svgChart.select(".y-axis").call(d3.axisLeft(y));
// }






























// const width = 750;
// const height = 600;

// // Create an SVG element to hold the map
// const svg = d3.select("#map").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("background-color", "#b0e0e6")
//     .call(d3.zoom().on("zoom", (event) => {
//         svg.attr("transform", event.transform);
//     }))
//     .append("g");

// // Define a projection
// const projection = d3.geoAlbersUsa()
//     .scale(1000)
//     .translate([width / 2, height / 2]);

// const path = d3.geoPath()
//     .projection(projection);

// const petOwnershipData = {};

// // Define a color scale
// const colorScale = d3.scaleSequential()
//     .domain([0, 100]) 
//     .interpolator(d3.interpolateGreens);

// // Create a tooltip element
// const tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip");

// d3.csv('pet_ownership.csv').then(data => {
//     data.forEach(d => {
//         petOwnershipData[d.State.toLowerCase()] = {
//             total: +d.PetOwnershipRate,
//             dog: +d.DogOwnershipRate,
//             cat: +d.CatOwnershipRate
//         };
//     });

//     console.log("Pet Ownership Data:", petOwnershipData);

//     loadAllStates();
// });

// document.getElementById('stateSelect').addEventListener('change', function() {
//     const selectedState = this.value;

//     if (selectedState === 'all') {
//         loadAllStates();
//     } else {
//         loadState(selectedState);
//     }
// });

// // load one state
// function loadState(stateFile) {
//     d3.json(stateFile).then(geojson => {
//         svg.selectAll("path").remove(); // Clear previous paths
//         svg.selectAll("text").remove(); // Clear previous labels

//         if (geojson.type === 'FeatureCollection') {
//             svg.selectAll("path")
//                 .data(geojson.features)
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("stroke", "#000")
//                 .attr("fill", d => {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                 })
//                 .on("mouseover", function(event, d) {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     if (stateData) {
//                         tooltip.html(
//                             `<strong>${d.properties.name}</strong><br>
//                              Pet Ownership Rate: ${stateData.total}%<br>
//                              Dog Ownership Rate: ${stateData.dog}%<br>
//                              Cat Ownership Rate: ${stateData.cat}%`
//                         );
//                         tooltip.style("opacity", "1").style("visibility", "visible");
//                     }
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", function() {
//                             const centroid = path.centroid(d);
//                             return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
//                         })
//                         .attr("stroke", "#ff0")
//                         .attr("stroke-width", "2")
//                         .attr("fill", d => colorScale(petOwnershipData[d.properties.name.toLowerCase()].total * 1.1));
//                 })
//                 .on("mousemove", function(event) {
//                     tooltip.style("top", (event.pageY - 10) + "px")
//                            .style("left", (event.pageX + 10) + "px");
//                 })
//                 .on("mouseout", function(d) {
//                     tooltip.style("opacity", "0").style("visibility", "hidden");
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", "translate(0, 0) scale(1)")
//                         .attr("stroke", "#000")
//                         .attr("stroke-width", "1")
//                         .attr("fill", d => {
//                             const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                             return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                         });
//                 });

//             svg.selectAll("text")
//                 .data(geojson.features)
//                 .enter().append("text")
//                 .attr("x", d => path.centroid(d)[0])
//                 .attr("y", d => path.centroid(d)[1])
//                 .attr("text-anchor", "middle")
//                 .attr("font-size", "10px")
//                 .attr("fill", "black")
//                 .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
//         } else if (geojson.type === 'Feature') {
//             svg.selectAll("path")
//                 .data([geojson])
//                 .enter().append("path")
//                 .attr("d", path)
//                 .attr("stroke", "#000")
//                 .attr("fill", d => {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                 })
//                 .on("mouseover", function(event, d) {
//                     const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                     if (stateData) {
//                         tooltip.html(
//                             `<strong>${d.properties.name}</strong><br>
//                              Pet Ownership Rate: ${stateData.total}%<br>
//                              Dog Ownership Rate: ${stateData.dog}%<br>
//                              Cat Ownership Rate: ${stateData.cat}%`
//                         );
//                     } else {
//                         tooltip.html(
//                             `<strong>${d.properties.name}</strong><br>
//                              Pet Ownership Rate: N/A<br>
//                              Dog Ownership Rate: N/A<br>
//                              Cat Ownership Rate: N/A`
//                         );
//                     }
//                     tooltip.style("opacity", "1").style("visibility", "visible");
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", function() {
//                             const centroid = path.centroid(d);
//                             return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
//                         })
//                         .attr("stroke", "#ff0")
//                         .attr("stroke-width", "2")
//                         .attr("fill", d => stateData ? colorScale(stateData.total * 1.1) : "#cfcd99");
//                 })
//                 .on("mousemove", function(event) {
//                     tooltip.style("top", (event.pageY - 10) + "px")
//                            .style("left", (event.pageX + 10) + "px");
//                 })
//                 .on("mouseout", function(d) {
//                     tooltip.style("opacity", "0").style("visibility", "hidden");
//                     d3.select(this)
//                         .transition()
//                         .duration(200)
//                         .attr("transform", "translate(0, 0) scale(1)")
//                         .attr("stroke", "#000")
//                         .attr("stroke-width", "1")
//                         .attr("fill", d => {
//                             const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                             return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                         });
//                 });                

//             svg.selectAll("text")
//                 .data([geojson])
//                 .enter().append("text")
//                 .attr("x", d => path.centroid(d)[0])
//                 .attr("y", d => path.centroid(d)[1])
//                 .attr("text-anchor", "middle")
//                 .attr("font-size", "10px")
//                 .attr("fill", "black")
//                 .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
//         }
//     }).catch(error => {
//         console.error("Error loading the GeoJSON data:", error); 
//     });
// }

// // load all states
// function loadAllStates() {
//     const stateFiles = [
//         "alabama.geojson",
//         "alaska.geojson",
//         "arizona.geojson",
//         "arkansas.geojson",
//         "california.geojson",
//         "colorado.geojson",
//         "connecticut.geojson",
//         "delaware.geojson",
//         "florida.geojson",
//         "georgia.geojson",
//         "hawaii.geojson",
//         "idaho.geojson",
//         "illinois.geojson",
//         "indiana.geojson",
//         "iowa.geojson",
//         "kansas.geojson",
//         "kentucky.geojson",
//         "louisiana.geojson",
//         "maine.geojson",
//         "maryland.geojson",
//         "massachusetts.geojson",
//         "michigan.geojson",
//         "minnesota.geojson",
//         "mississippi.geojson",
//         "missouri.geojson",
//         "montana.geojson",
//         "nebraska.geojson",
//         "nevada.geojson",
//         "new hampshire.geojson",
//         "new jersey.geojson",
//         "new mexico.geojson",
//         "new york.geojson",
//         "north carolina.geojson",
//         "north dakota.geojson",
//         "ohio.geojson",
//         "oklahoma.geojson",
//         "oregon.geojson",
//         "pennsylvania.geojson",
//         "rhode island.geojson",
//         "south carolina.geojson",
//         "south dakota.geojson",
//         "tennessee.geojson",
//         "texas.geojson",
//         "utah.geojson",
//         "vermont.geojson",
//         "virginia.geojson",
//         "washington.geojson",
//         "west virginia.geojson",
//         "wisconsin.geojson",
//         "wyoming.geojson"
//     ];

//     let allFeatures = [];

//     stateFiles.forEach((file, index) => {
//         d3.json(file).then(geojson => {
//             if (geojson.type === 'FeatureCollection') {
//                 allFeatures = allFeatures.concat(geojson.features);
//             } else if (geojson.type === 'Feature') {
//                 allFeatures.push(geojson);
//             }

//             if (index === stateFiles.length - 1) { // Check if it's the last file
//                 svg.selectAll("path").remove(); 
//                 svg.selectAll("text").remove(); // Clear previous labels

//                 svg.selectAll("path")
//                     .data(allFeatures)
//                     .enter().append("path")
//                     .attr("d", path)
//                     .attr("stroke", "#000")
//                     .attr("fill", d => {
//                         const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                         return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                     })
//                     .on("mouseover", function(event, d) {
//                         const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                         if (stateData) {
//                             tooltip.html(
//                                 `<strong>${d.properties.name}</strong><br>
//                                  Pet Ownership Rate: ${stateData.total}%<br>
//                                  Dog Ownership Rate: ${stateData.dog}%<br>
//                                  Cat Ownership Rate: ${stateData.cat}%`
//                             );
//                         } else {
//                             tooltip.html(
//                                 `<strong>${d.properties.name}</strong><br>
//                                  Pet Ownership Rate: N/A<br>
//                                  Dog Ownership Rate: N/A<br>
//                                  Cat Ownership Rate: N/A`
//                             );
//                         }
//                         tooltip.style("opacity", "1").style("visibility", "visible");
//                         d3.select(this)
//                             .transition()
//                             .duration(200)
//                             .attr("transform", function() {
//                                 const centroid = path.centroid(d);
//                                 return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
//                             })
//                             .attr("stroke", "#ff0")
//                             .attr("stroke-width", "2")
//                             .attr("fill", d => stateData ? colorScale(stateData.total * 1.1) : "#cfcd99");
//                     })
//                     .on("mousemove", function(event) {
//                         tooltip.style("top", (event.pageY - 10) + "px")
//                                .style("left", (event.pageX + 10) + "px");
//                     })
//                     .on("mouseout", function(d) {
//                         tooltip.style("opacity", "0").style("visibility", "hidden");
//                         d3.select(this)
//                             .transition()
//                             .duration(200)
//                             .attr("transform", "translate(0, 0) scale(1)")
//                             .attr("stroke", "#000")
//                             .attr("stroke-width", "1")
//                             .attr("fill", d => {
//                                 const stateData = petOwnershipData[d.properties.name.toLowerCase()];
//                                 return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
//                             });
//                     });                    

//                 svg.selectAll("text")
//                     .data(allFeatures)
//                     .enter().append("text")
//                     .attr("x", d => path.centroid(d)[0])
//                     .attr("y", d => path.centroid(d)[1])
//                     .attr("text-anchor", "middle")
//                     .attr("font-size", "10px")
//                     .attr("fill", "black")
//                     .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
//             }
//         }).catch(error => {
//             console.error(`Error loading the GeoJSON data for ${file}:`, error); 
//         });
//     });
// }

// const margin = { top: 30, right: 30, bottom: 70, left: 60 };
// const chartWidth = 800 - margin.left - margin.right;
// const chartHeight = 500 - margin.top - margin.bottom;

// const svgChart = d3.select("#barChart")
//     .attr("width", chartWidth + margin.left + margin.right)
//     .attr("height", chartHeight + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleBand()
//     .range([0, chartWidth])
//     .padding(0.1);

// const y = d3.scaleLinear()
//     .range([chartHeight, 0]);

// svgChart.append("g")
//     .attr("transform", `translate(0,${chartHeight})`)
//     .attr("class", "x-axis");

// svgChart.append("g")
//     .attr("class", "y-axis");

// d3.select("#catImage").on("mouseover", () => updateBarChart("cat"));
// d3.select("#dogImage").on("mouseover", () => updateBarChart("dog"));

// function updateBarChart(petType) {
//     const data = Object.entries(petOwnershipData).map(([state, rates]) => ({
//         state: state.charAt(0).toUpperCase() + state.slice(1),
//         rate: rates[petType]
//     }));

//     x.domain(data.map(d => d.state));
//     y.domain([0, d3.max(data, d => d.rate)]);

//     svgChart.selectAll(".bar").remove();

//     svgChart.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", d => x(d.state))
//         .attr("width", x.bandwidth())
//         .attr("y", d => y(d.rate))
//         .attr("height", d => chartHeight - y(d.rate))
//         .attr("fill", petType === "cat" ? "#ffb6c1" : "#add8e6");

//     svgChart.select(".x-axis").call(d3.axisBottom(x))
//         .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-0.8em")
//         .attr("dy", "-0.55em")
//         .attr("transform", "rotate(-65)");

//     svgChart.select(".y-axis").call(d3.axisLeft(y));
// }








const width = 750;
const height = 600;

// Create an SVG element to hold the map
const svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#b0e0e6")
    .call(d3.zoom().on("zoom", (event) => {
        svg.attr("transform", event.transform);
    }))
    .append("g");

// Define a projection
const projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

const path = d3.geoPath()
    .projection(projection);

const petOwnershipData = {};

// Define a color scale
const colorScale = d3.scaleSequential()
    .domain([0, 100]) 
    .interpolator(d3.interpolateGreens);

// Create a tooltip element
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");

d3.csv('pet_ownership.csv').then(data => {
    data.forEach(d => {
        petOwnershipData[d.State.toLowerCase()] = {
            total: +d.PetOwnershipRate,
            dog: +d.DogOwnershipRate,
            cat: +d.CatOwnershipRate
        };
    });

    console.log("Pet Ownership Data:", petOwnershipData);

    loadAllStates();
});

document.getElementById('stateSelect').addEventListener('change', function() {
    const selectedState = this.value;

    if (selectedState === 'all') {
        loadAllStates();
    } else {
        loadState(selectedState);
    }
});

// load one state
function loadState(stateFile) {
    d3.json(stateFile).then(geojson => {
        svg.selectAll("path").remove(); // Clear previous paths
        svg.selectAll("text").remove(); // Clear previous labels

        if (geojson.type === 'FeatureCollection') {
            svg.selectAll("path")
                .data(geojson.features)
                .enter().append("path")
                .attr("d", path)
                .attr("stroke", "#000")
                .attr("fill", d => {
                    const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                    return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
                })
                .on("mouseover", function(event, d) {
                    const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                    if (stateData) {
                        tooltip.html(
                            `<strong>${d.properties.name}</strong><br>
                             Pet Ownership Rate: ${stateData.total}%<br>
                             Dog Ownership Rate: ${stateData.dog}%<br>
                             Cat Ownership Rate: ${stateData.cat}%`
                        );
                        tooltip.style("opacity", "1").style("visibility", "visible");
                    }
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("transform", function() {
                            const centroid = path.centroid(d);
                            return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
                        })
                        .attr("stroke", "#ff0")
                        .attr("stroke-width", "2")
                        .attr("fill", d => colorScale(petOwnershipData[d.properties.name.toLowerCase()].total * 1.1));
                })
                .on("mousemove", function(event) {
                    tooltip.style("top", (event.pageY - 10) + "px")
                           .style("left", (event.pageX + 10) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.style("opacity", "0").style("visibility", "hidden");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("transform", "translate(0, 0) scale(1)")
                        .attr("stroke", "#000")
                        .attr("stroke-width", "1")
                        .attr("fill", d => {
                            const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                            return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
                        });
                });

            svg.selectAll("text")
                .data(geojson.features)
                .enter().append("text")
                .attr("x", d => path.centroid(d)[0])
                .attr("y", d => path.centroid(d)[1])
                .attr("text-anchor", "middle")
                .attr("font-size", "10px")
                .attr("fill", "black")
                .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
        } else if (geojson.type === 'Feature') {
            svg.selectAll("path")
                .data([geojson])
                .enter().append("path")
                .attr("d", path)
                .attr("stroke", "#000")
                .attr("fill", d => {
                    const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                    return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
                })
                .on("mouseover", function(event, d) {
                    const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                    if (stateData) {
                        tooltip.html(
                            `<strong>${d.properties.name}</strong><br>
                             Pet Ownership Rate: ${stateData.total}%<br>
                             Dog Ownership Rate: ${stateData.dog}%<br>
                             Cat Ownership Rate: ${stateData.cat}%`
                        );
                    } else {
                        tooltip.html(
                            `<strong>${d.properties.name}</strong><br>
                             Pet Ownership Rate: N/A<br>
                             Dog Ownership Rate: N/A<br>
                             Cat Ownership Rate: N/A`
                        );
                    }
                    tooltip.style("opacity", "1").style("visibility", "visible");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("transform", function() {
                            const centroid = path.centroid(d);
                            return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
                        })
                        .attr("stroke", "#ff0")
                        .attr("stroke-width", "2")
                        .attr("fill", d => stateData ? colorScale(stateData.total * 1.1) : "#cfcd99");
                })
                .on("mousemove", function(event) {
                    tooltip.style("top", (event.pageY - 10) + "px")
                           .style("left", (event.pageX + 10) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.style("opacity", "0").style("visibility", "hidden");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("transform", "translate(0, 0) scale(1)")
                        .attr("stroke", "#000")
                        .attr("stroke-width", "1")
                        .attr("fill", d => {
                            const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                            return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
                        });
                });                

            svg.selectAll("text")
                .data([geojson])
                .enter().append("text")
                .attr("x", d => path.centroid(d)[0])
                .attr("y", d => path.centroid(d)[1])
                .attr("text-anchor", "middle")
                .attr("font-size", "10px")
                .attr("fill", "black")
                .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
        }
    }).catch(error => {
        console.error("Error loading the GeoJSON data:", error); 
    });
}

///   =============================   The Bar Chart Code =============================================== //



// Create functions to draw the bar charts
function drawBarChart(data, title) {
    // Set up the dimensions and margins for the bar chart
    const margin = {top: 20, right: 30, bottom: 40, left: 40};
    const width = 750 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Remove any existing SVG elements in the bar chart container
    d3.select("#barChart").selectAll("svg").remove();

    // Create an SVG element for the bar chart
    const svg = d3.select("#barChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the x and y scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.State))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add bars to the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.State))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");

    // Add a title to the bar chart
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title);
}

// Event listeners for the buttons
document.getElementById('dogButton').addEventListener('click', function() {
    const dogData = Object.keys(petOwnershipData).map(state => ({
        State: state,
        value: petOwnershipData[state].dog
    }));
    drawBarChart(dogData, "Dog Ownership Rate by State");
});

document.getElementById('catButton').addEventListener('click', function() {
    const catData = Object.keys(petOwnershipData).map(state => ({
        State: state,
        value: petOwnershipData[state].cat
    }));
    drawBarChart(catData, "Cat Ownership Rate by State");
});



// load all states
function loadAllStates() {
    const stateFiles = [
        "alabama.geojson",
        "alaska.geojson",
        "arizona.geojson",
        "arkansas.geojson",
        "california.geojson",
        "colorado.geojson",
        "connecticut.geojson",
        "delaware.geojson",
        "florida.geojson",
        "georgia.geojson",
        "hawaii.geojson",
        "idaho.geojson",
        "illinois.geojson",
        "indiana.geojson",
        "iowa.geojson",
        "kansas.geojson",
        "kentucky.geojson",
        "louisiana.geojson",
        "maine.geojson",
        "maryland.geojson",
        "massachusetts.geojson",
        "michigan.geojson",
        "minnesota.geojson",
        "mississippi.geojson",
        "missouri.geojson",
        "montana.geojson",
        "nebraska.geojson",
        "nevada.geojson",
        "new hampshire.geojson",
        "new jersey.geojson",
        "new mexico.geojson",
        "new york.geojson",
        "north carolina.geojson",
        "north dakota.geojson",
        "ohio.geojson",
        "oklahoma.geojson",
        "oregon.geojson",
        "pennsylvania.geojson",
        "rhode island.geojson",
        "south carolina.geojson",
        "south dakota.geojson",
        "tennessee.geojson",
        "texas.geojson",
        "utah.geojson",
        "vermont.geojson",
        "virginia.geojson",
        "washington.geojson",
        "west virginia.geojson",
        "wisconsin.geojson",
        "wyoming.geojson"
    ];

    let allFeatures = [];

    stateFiles.forEach((file, index) => {
        d3.json(file).then(geojson => {
            if (geojson.type === 'FeatureCollection') {
                allFeatures = allFeatures.concat(geojson.features);
            } else if (geojson.type === 'Feature') {
                allFeatures.push(geojson);
            }

            if (index === stateFiles.length - 1) { // Check if it's the last file
                svg.selectAll("path").remove(); 
                svg.selectAll("text").remove(); // Clear previous labels

                svg.selectAll("path")
                    .data(allFeatures)
                    .enter().append("path")
                    .attr("d", path)
                    .attr("stroke", "#000")
                    .attr("fill", d => {
                        const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                        return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
                    })
                    .on("mouseover", function(event, d) {
                        const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                        if (stateData) {
                            tooltip.html(
                                `<strong>${d.properties.name}</strong><br>
                                 Pet Ownership Rate: ${stateData.total}%<br>
                                 Dog Ownership Rate: ${stateData.dog}%<br>
                                 Cat Ownership Rate: ${stateData.cat}%`
                            );
                        } else {
                            tooltip.html(
                                `<strong>${d.properties.name}</strong><br>
                                 Pet Ownership Rate: N/A<br>
                                 Dog Ownership Rate: N/A<br>
                                 Cat Ownership Rate: N/A`
                            );
                        }
                        tooltip.style("opacity", "1").style("visibility", "visible");
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("transform", function() {
                                const centroid = path.centroid(d);
                                return `translate(${centroid[0]}, ${centroid[1]}) scale(1.2) translate(${-centroid[0]}, ${-centroid[1]})`;
                            })
                            .attr("stroke", "#ff0")
                            .attr("stroke-width", "2")
                            .attr("fill", d => stateData ? colorScale(stateData.total * 1.1) : "#cfcd99");
                    })
                    .on("mousemove", function(event) {
                        tooltip.style("top", (event.pageY - 10) + "px")
                               .style("left", (event.pageX + 10) + "px");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("opacity", "0").style("visibility", "hidden");
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("transform", "translate(0, 0) scale(1)")
                            .attr("stroke", "#000")
                            .attr("stroke-width", "1")
                            .attr("fill", d => {
                                const stateData = petOwnershipData[d.properties.name.toLowerCase()];
                                return stateData ? colorScale(stateData.total) : "#cfcd99"; // Default color if no data
                            });
                    });                    

                svg.selectAll("text")
                    .data(allFeatures)
                    .enter().append("text")
                    .attr("x", d => path.centroid(d)[0])
                    .attr("y", d => path.centroid(d)[1])
                    .attr("text-anchor", "middle")
                    .attr("font-size", "10px")
                    .attr("fill", "black")
                    .text(d => petOwnershipData[d.properties.name.toLowerCase()] ? petOwnershipData[d.properties.name.toLowerCase()].total : '');
            }
        }).catch(error => {
            console.error(`Error loading the GeoJSON data for ${file}:`, error); 
        });
    });
}


// ================================= END OF BAR CHART ================================================== //

