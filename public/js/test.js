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
      for (var deptName in fd){
        var dept = fd[deptName];
        for (var s in dept["Stations"]){
          var station = dept["Stations"][s];
          var position = codeAddress(station["Location"], function(c){
            marker = L.marker([c.lat, c.long]).addTo(map);
            console.log(c);
          });
        }
      }
      //Section that places d3 bubbles on map.
      var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");
      d3.json("/json/geojson/fd.json", function(c){
        var transform = d3.geo.transform({point: function(x, y){
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        }});
        var path = d3.geo.path().projection(transform);
        d3_features = g.selectAll("path")
          .data(c.features)
          .enter().append("path");
        map.on("viewreset", function(){
          bounds = path.bounds(c);
          var topLeft = bounds[0],
            bottomRight = bounds[1];
          svg .attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");
          g .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
          // initialize the path data 
          d3_features.attr("d", path)
            .style("fill-opacity", 0.7)
            .attr('fill','blue');
        });
        //console.log(map.getBounds().getEast());
      });
      //End of bubble section
    });
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }
})();
