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
module.exports = pagesController;
