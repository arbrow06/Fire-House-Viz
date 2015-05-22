function codeAddress(address, callback) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var position = (results[0].geometry.location);
      var coordinates = {};
      coordinates["lat"] = position.A;
      coordinates["long"] = position.F;
      callback(coordinates);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
/*function overlay(){
  var svg = d3.select(map.getPanse().overlayPane).append("svg"),
  g = svg.append("g").attr("class", "leaflet-zoom-hide");
  d3.json("json/fd.json", function(c){

  });
}*/
function initialize(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //var setCenterView = codeAddress([position.coords.latitude, position.coords.longitude], function(c){
        var map = L.map("map").setView([position.coords.latitude, position.coords.longitude], 14);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYW5kcmV3YnJvd24iLCJhIjoiNzc2OGRjZTI4YTI0NDViNTAyNDgxNWVhZTM4N2JiNWMifQ.nqxvTAuR8iVPjFK72Qe22A', {
          attribution: 'Map  data &copy; 2015 Andrew Brown',
          maxZoom: 18,
          id: 'andrewbrown.m8aobonh',
          accessToken: 'pk.eyJ1IjoiYW5kcmV3YnJvd24iLCJhIjoiNzc2OGRjZTI4YTI0NDViNTAyNDgxNWVhZTM4N2JiNWMifQ.nqxvTAuR8iVPjFK72Qe22A'
        }).addTo(map);
        for (var deptName in fd){
          var dept = fd[deptName];
          for (var s in dept["Stations"]){
            var station = dept["Stations"][s];
            var position = codeAddress(station["Location"], function(c){
              marker = L.marker([c.lat, c.long]).addTo(map);
            });
          }
        }
        console.log(map.getBounds().getEast());
  //  });
  });
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }
}
var fd = {
  "Mount Vernon Fire Department": {
    "Stations": {
      "Downtown": {
        "Location": "50 W. 3rd Street, Mount Vernon, NY",
        "Call Volume": 420,
        "Apparatus": {
          "active": {
            "Engine 203": {
              "Response Time": 6,
              "Unit Call Volume": 325
            },
            "Tower Ladder 61": {
              "Response Time": 7,
              "Unit Call Volume": 275
            }
          },
          "spare": [
          "Engine 201",
          "Engine 207",
          "Ladder 64"
          ]
        }
      },
      "West Mount Vernon": {
        "Location": "9 Oak Street, Mount Vernon, NY",
        "Call Volume": 325,
        "Apparatus": {
          "active": {
            "Engine 204": {
              "Response Time": 10,
              "Unit Call Volume": 234
            }
          },
          "spare": [
          "Engine 202"
          ]
        }
      },
      "South Side": {
        "Location": "435 S. Fulton Avenue, Mount Vernon, NY",
        "Call Volume": 534,
        "Apparatus": {
          "active": {
            "Engine 205": {
              "Response Time": 6,
              "Unit Call Volume": 212
            },
            "Ladder 63": {
              "Response Time": 3,
              "Unit Call Volume": 120
            },
            "Rescue 2": {
              "Response Time": 4,
              "Unit Call Volume": 121
            }
          },
          "spare": [

          ]
        }
      },
      "North Side": {
        "Location": "470 E. Lincoln Avenue, Mount Vernon, NY",
        "Call Volume": 342,
        "Apparatus": {
          "active": {
            "Engine 206": {
              "Response Time": 18,
              "Unit Call Volume": 121
            },
            "Ladder 62": {
              "Response Time": 10,
              "Unit Call Volume": 123
            }
          },
          "spare": [

          ]
        }
      }
    },
    "chiefs": {
      "Car 2290": "Transport Unit",
      "Car 2291": "Chief of Department",
      "Car 2292": "Deputy Chief",
      "Car 2293": "Deputy Chief",
      "Car 2298": "Support Unit",
      "Car 2299": "Support Unit"
    }
  }
};

initialize();
