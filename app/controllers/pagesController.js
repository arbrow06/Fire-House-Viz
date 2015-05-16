var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Locomotive';
  this.render();
}
pagesController.maps =
function() {
  this.title = 'Map';
  this.render();
}
pagesController.topojson =
function() {
  this.title = 'Topography';
  this.render();
}
pagesController.test =
function() {
  this.title = 'test';
  this.render();
}
module.exports = pagesController;
