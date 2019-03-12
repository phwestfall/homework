// from data.js
var tableData = data;

// Variables
var filterButton = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var populate = (ufoData) => {

  ufoData.forEach(ufo_sightings => {
    var row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
};

//Populate table
populate(data);

// Filter by attribute
filterButton.on("click", function() {

  // prevent the page from refreshing  
    d3.event.preventDefault();
    d3.select("#summary").html("");

// select the input element and get the raw html node
    var inputElement = d3.select("#datetime");

    var inputValue = inputElement.property("value").trim();
        console.log(inputValue);
        console.log(tableData);

    var filteredData = tableData.filter(ufo => ufo.datetime === inputValue);
        console.log(filteredData);    

    var populate = (ufoData) => {

        ufoData.forEach(ufo_sightings => {
          var row = tbody.append("tr");
          columns.forEach(column => row.append("td").text(ufo_sightings[column])
          )
        });
      };
      
      //Populate table
      if (inputValue.length !== 0){
        populate(filteredData);
      }
      else {
        tbody.append("tr").append("td").text("No results found!");
      }

});
//     var inputDate = inputField1.property("value").trim();
//     var inputCity = inputField2.property("value").toLowerCase().trim();
//   // Filter by field matching input value
//     var filterDate = tableData.filter(data => data.datetime === inputDate);
//         console.log(filterDate)
//     var filterCity = tableData.filter(data => data.city === inputCity);
//         console.log(filterCity)
//     var filterData = tableData.filter(data => data.datetime === inputDate && data.city === inputCity);
//         console.log(filterData)

// //   Add filtered sighting to table
//   tbody.html("");

//   let response = {
//     filterData, filterCity, filterDate
//   }

//   if (response.filterData.length !== 0) {
//     populate(filterData);
//   }
//     else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
//       populate(filterCity) || populate(filterDate);
  
//     }
//     else {
//       tbody.append("tr").append("td").text("No results found!"); 
//     }
// });

resetbtn.on("click", () => {
  tbody.html("");
  populate(data)
  console.log("Table reset")});