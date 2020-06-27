

   // get the geo data from the URL
   function get_data_from_url() {

            // Store our API endpoint inside queryUrl
            
            var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
            // Perform a GET request to the query URL
            d3.json(queryUrl, function(data) {
              // Once we get a response, send the data.features object to the createFeatures function
              createFeatures(data.features);  
            });

            var tplatesUrl ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

         /*
            var platesT = new L.LayerGroup();
            createMap(platesT)

            // Retrieve platesURL (Tectonic Plates GeoJSON Data) with D3
            d3.json(tplatesUrl, function(tdata) {
                  // Create a GeoJSON Layer the plateData
                  L.geoJson(tdata, {
                      color: "#DC143C",
                      weight: 2
                  // Add plateData to tectonicPlates LayerGroups 
                  }).addTo(platesT);
                  // Add tectonicPlates Layer to the Map
                  tectonicPlates.addTo(myMap);
            });  */












    }  //get_data end function 
 

    function getColor(d) {
      console.log("d value",d)

      if (d < 2.8 ) {
        color = "yellow";
        console.log("d < 1 ",d)
      }
      else if (d > 2.8 && d < 5.9)  {
        color = "blue";
        console.log("d > 1 && d < 3.9",d)
      }
      else if (d > 5.9  && d < 12.1) {
        color = "green";
        console.log("d > 4 && d < 5.9",d)
      }
      else {
        color = "red";
      }
      return color

    }



      function createFeatures(earthquakeData) {

            x ="Magnitud :"
            var earthquakes = L.geoJSON(earthquakeData, {
              pointToLayer: function (feature, latlng) {
           
                 return L.circleMarker(latlng, {radius: feature.properties.mag * 3 ,
                                               color: getColor(feature.properties.mag * 3 ) ,
                                               fillColor: getColor(feature.properties.mag * 3 ) });
              },
              onEachFeature: function (feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.place + 
                 "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><h3>" + x +feature.properties.mag + "</h3>");
              }
            })   
       
            // Sending our earthquakes layer to the createMap function
            createMap(earthquakes);

      }  //createFeatures end function 





      function createMap(earthquakes) {

        // Define streetmap and darkmap layers
        var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: "mapbox/streets-v11",
          accessToken: API_KEY
        });

        var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "dark-v10",
          accessToken: API_KEY
        });

        /*
        // Store our API endpoint inside queryUrl                  
        var queryUrl_01 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
        // Perform a GET request to the query URL
        var geojsonFeature  = d3.json(queryUrl_01)
          // Once we get a response, send the data.features object to the createFeatures function
        
        var plaques = L.geoJSON(geojsonFeature)

           
   */










        // Define a baseMaps object to hold our base layers
        var baseMaps = {
          "Street Map": streetmap,
          "Dark Map": darkmap
        };

        // Create overlay object to hold our overlay layer
        var overlayMaps = {
          Earthquakes: earthquakes  /*,
          TecPlates: platesT  */
        };

        // Create our map, giving it the streetmap and earthquakes layers to display on load
        var myMap = L.map("map", {
          center: [
            37.09, -95.71
          ],
          zoom: 5,
          layers: [streetmap, earthquakes]
        });

        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);

      }  //createMap end function 

//

function get_data_from_alocal_file() {

// Use this link to get the geojson data.
var link = "Leaflet-Step-1/static/data/earthq_data.geojson";
earthq_dataM4-7
// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  //L.geoJson(geojsonFeature).addTo(myMap);
  createFeatures(data.features);
});

}  //get_data_from_alocal_file end function


  


// main process control 
function main_process() {

get_data_from_url()
 //get_data_from_alocal_file()
 //test_map()
}

main_process()
 

///======

function test_map() {



  var map = L.map('map').setView([-41.2858, 174.7868], 13);
  mapLink = 
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 18,
      }).addTo(map);

// Add an SVG element to Leaflet’s overlay pane
var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("rectangle.json", function(geoShape) {

//  create a d3.geo.path to convert GeoJSON to SVG
var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);

// create path elements for each of the features
d3_features = g.selectAll("path")
.data(geoShape.features)
.enter().append("path");

map.on("viewreset", reset);

reset();

// fit the SVG element to leaflet's map layer
function reset() {
  
bounds = path.bounds(geoShape);

var topLeft = bounds[0],
  bottomRight = bounds[1];

svg .attr("width", bottomRight[0] - topLeft[0])
  .attr("height", bottomRight[1] - topLeft[1])
  .style("left", topLeft[0] + "px")
  .style("top", topLeft[1] + "px");

g .attr("transform", "translate(" + -topLeft[0] + "," 
                                  + -topLeft[1] + ")");

// initialize the path data	
d3_features.attr("d", path)
  .style("fill-opacity", 0.7)
  .attr('fill','blue');
} 

// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
var point = map.latLngToLayerPoint(new L.LatLng(y, x));
this.stream.point(point.x, point.y);
}

})





  }
