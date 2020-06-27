


   // get the geo data from the URL
   function get_data_from_url() {

            // Store our API endpoint inside queryUrl
            
            var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
            // Perform a GET request to the query URL
            d3.json(queryUrl, function(data) {
              // Once we get a response, send the data.features object to the createFeatures function        
            createFeatures(data.features);  
            });
        

    }  //get_data end function 
 

    function getColor(d) {
     // console.log("d value",d)

      if (d <= 2 ) {
        color = "green";
  
      }
      else if (d >= 2.001 && d <= 4)  {
        color = "orange";

      }
      else if (d >= 4.1  && d <= 6) {
        color = "red";
      }
      else if (d >= 6.1) {
        color = "purple";
      }

      else {
        color = "black";
      }
      return color

    }



      function createFeatures(earthquakeData) {

            x ="Magnitude :"
            // a Layer geojson is been creaed
            var earthquakes = L.geoJSON(earthquakeData, {
              pointToLayer: function (feature, latlng) {
           
                 return L.circleMarker(latlng, {radius: feature.properties.mag * 3 ,
                                              color: getColor(feature.properties.mag  ) });
                                              // fillColor: getColor(feature.properties.mag * 3 ) 
              },
              onEachFeature: function (feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.place + 
                 "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><h3>" + x +feature.properties.mag + "</h3>");
              }

              
            });



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

        
        var platesT= new L.LayerGroup();
        var tplatesUrl ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
        d3.json(tplatesUrl, function(tp_data) {  
          
          L.geoJSON(tp_data, {
            color: "white",
            weight: 3
          }).addTo(platesT);
          platesT.addTo(myMap);
        });


        


        // Define a baseMaps object to hold our base layers
        var baseMaps = {
          "Street Map": streetmap,
          "Dark Map": darkmap
        };

        // Create overlay object to hold our overlay layer
        var overlayMaps = {
          Earthquakes: earthquakes  ,
          TecPlates: platesT  
        };

        


        // Create our map, giving it the streetmap and earthquakes layers to display on load
        var myMap = L.map("map1", {
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





        // create the legends
          var legend = L.control({position: 'bottomright'});

          legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 2, 4, 6 ],
                    labels = [];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                }

                return div;
          };

          legend.addTo(myMap);









    }  //createMap end function 



//  Earthquakes chart



   // get the geo data from the URL
   function get_data_from_url_e() {

    // Store our API endpoint inside queryUrl
    
    var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    // Perform a GET request to the query URL
    d3.json(queryUrl, function(data) {
      // Once we get a response, send the data.features object to the createFeatures function        
    createFeatures_e(data.features);  
    });


}  //get_data end function 


function getColor_e(d) {
// console.log("d value",d)

if (d <= 2 ) {
color = "green";

}
else if (d >= 2.001 && d <= 4)  {
color = "orange";

}
else if (d >= 4.1  && d <= 6) {
color = "red";
}
else if (d >= 6.1) {
color = "purple";
}

else {
color = "black";
}
return color

}



function createFeatures_e(earthquakeData) {

    x ="Magnitude :"
    // a Layer geojson is been creaed
    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
   
         return L.circleMarker(latlng, {radius: feature.properties.mag * 3 ,
                                      color: getColor_e(feature.properties.mag  ) });
                                      // fillColor: getColor(feature.properties.mag * 3 ) 
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
         "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><h3>" + x +feature.properties.mag + "</h3>");
      }

      
    });



    // Sending our earthquakes layer to the createMap function
  
createMap_e(earthquakes);

 

}  //createFeatures end function 


function createMap_e(earthquakes) {

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

var platesT= new L.LayerGroup();
var tplatesUrl ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
d3.json(tplatesUrl, function(tp_data) {  
  
  L.geoJSON(tp_data, {
    color: "white",
    weight: 3
  }).addTo(platesT);
  platesT.addTo(myMap);
});

*/




// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
  Earthquakes: earthquakes  // ,
//  TecPlates: platesT  
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






  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 2, 4, 6 ],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor_e(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
  };

  legend.addTo(myMap);









}  //createMap end function 






//  end only earqueaks








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
  get_data_from_url_e()
  get_data_from_url()

}

main_process()
 
