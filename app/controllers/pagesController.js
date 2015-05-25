var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Fire Responseware Technologies';
  this.render();
};
pagesController.maps =
function() {
  this.title = 'Map';
  this.render();
};
//Test Pages
pagesController.topojson =
function() {
  this.title = 'Topography';
  this.render();
};
pagesController.test =
function() {
  this.title = 'test';
  this.render();
};
//End Test Pages
module.exports = pagesController;
