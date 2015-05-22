//func.js
//converts written addres, area codes, location names to LatLng
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
//json variable
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