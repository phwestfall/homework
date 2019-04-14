    
var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

d3.json(quakeUrl, (error, response) => {
    if (error) throw error;

    console.log(response);

    createFeatures(response.features);
});


// Function for color scale based on magnitude
function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#ea2c2c";
    case magnitude > 4:
      return "#ea822c";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "#eecc00";
    case magnitude > 1:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }


function createFeatures(data) {

    // Function to bind popups
    function onEachFeature(feature, layer) {            
        layer.bindPopup(
            `<h3>Magnitude: ${feature.properties.mag}<br> Location: ${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`
        );
    }

    // Create GeoJSON layer
    var earthquakes = L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
            // Create and style each circle marker
            return L.circleMarker(latlng, {
                color: getColor(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                fillOpacity: 1,
                weight: 0.5,
                radius: (feature.properties.mag) * 3.2,
            });
        },
        onEachFeature: onEachFeature
    });

    // Techtonic plates json path
    var platesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';

    // Create a layer group for faultlines
    var techPlates = new L.LayerGroup();

    // Perform a GET request to the query URL: APIlink_plates
    d3.json(platesUrl, (error, platesData) => {
        if (error) throw error;

        // once we get a response, send the geoJson.features array of objects object to the L.geoJSON method
        L.geoJSON(platesData.features, {
            style: (geoJsonFeature) => {
                return {
                    weight: 2,
                    color: 'purple'
                }
            },
        }).addTo(techPlates);
    })

    // Send earthquakes layer to createMap function
    createMap(earthquakes, techPlates)
}


function createMap(earthquakes, techPlates) {
    var apiKey = "pk.eyJ1IjoicGh3ZXN0ZmFsbCIsImEiOiJjanR0OWI3b3oxOTdqNDVuc2JuYmY1YWJkIn0.kdqXNqXWbfXpR1OKp7Qv5w";

    var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: apiKey
    });

    var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: apiKey
    });

    var lightMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: apiKey
    });

    var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: apiKey
    });

    var highContrastMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.high-contrast',
        accessToken: apiKey
        });

    // Define baseMaps object to hold our base layers
    var baseLayers = {
        Light: lightMap,
        Streets: graymap,
        Dark: darkMap,
        "High Contrast": highContrastMap,
        Satellite: satellite
    };

    // Create overlay object to hold overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes,
        'Fault Lines': techPlates
    };

    // Create map
    var map = L.map("mapid", {
        center: [40.7, -94.5],
        zoom: 3,
        layers: [lightMap, earthquakes]
    });

    // Create layer control
    L.control
        .layers(baseLayers, overlayMaps, {
            collapsed: false
        })
        .addTo(map);

    // Create a legend for magnitude color scale
    var legend = L.control({
        position: 'bottomright'
    });

    // When layer control added, insert div with class 'info legend'
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
    };

    // Add info legend to map
    legend.addTo(map);
}