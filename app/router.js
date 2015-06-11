import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	//Default Static Pages
	this.route('about', {path: '/about'});
	this.route('faq', {path: '/faq'});
	this.route('pricing', {path: '/pricing'});
	this.route('login', {path: '/login'});
	this.route('signup', {path: '/signup'});
	//Member Pages
    this.route('dashboard', {path: '/dashboard'});
    this.route('settings', {path: '/settings'});
    //Mapping Routing
});

export default Router;
