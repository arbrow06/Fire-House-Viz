(function initialize(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var map = L.map("map").setView([position.coords.latitude, position.coords.longitude], 14);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYW5kcmV3YnJvd24iLCJhIjoiNzc2OGRjZTI4YTI0NDViNTAyNDgxNWVhZTM4N2JiNWMifQ.nqxvTAuR8iVPjFK72Qe22A', {
        attribution: 'Map  data &copy; 2015 Andrew Brown',
        maxZoom: 18,
        id: 'andrewbrown.m8aobonh',
        accessToken: 'pk.eyJ1IjoiYW5kcmV3YnJvd24iLCJhIjoiNzc2OGRjZTI4YTI0NDViNTAyNDgxNWVhZTM4N2JiNWMifQ.nqxvTAuR8iVPjFK72Qe22A'
        }).addTo(map);
        /* How to drop a marker at each station
      for (var deptName in fd){
        var dept = fd[deptName];
        for (var s in dept["Stations"]){
          var station = dept["Stations"][s];
          var position = codeAddress(station["Location"], function(c){
            //marker = L.marker([c.lat, c.long]).addTo(map);
            //console.log(c);
          });
        }
      }*/


      //Section that places d3 bubbles on map.

      //The overlay plane!
      var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");
      d3.json("json/geoFd.json", function(collection){
        function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }
        var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);
        var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path");
        feature.attr("d", path);
        var bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];
        svg .attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

        g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

      });
      //End of bubble section
    });
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }
})();
