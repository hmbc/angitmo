/* global angular */
import { default as homeModuleName } from './home/module'
import { controllerName as homeControllerName, albumsResolver as homeControllerAlbumsResolver } from './home/home.controller'
import { controllerName as genresListConrollerName } from './genres/genres-list.controller'
import { controllerName as albumsListControllerName, albumsResolver as albumsListControllerResolver } from './albums/albums-list.controller';
import { controllerName as albumDetailsControllerName, albumsResolver as albumDetailsResolver } from './albums/album-details.controller';

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/home/home.html',
			controller: homeControllerName,
			controllerAs: 'ctrl',
			resolve: {
				albums: homeControllerAlbumsResolver
			}
		})
		.when('/albums/genre/:genre', {
			templateUrl: '/albums/albums-list.html',
			controller: albumsListControllerName,
			controllerAs: 'ctrl',
			resolve: {
				albums: albumsListControllerResolver
			}
		})
		.when('/album/:id', {
			templateUrl:'/albums/album-details.html',
			controller: albumDetailsControllerName,
			controllerAs:'ctrl',
			resolve: {
				album: albumDetailsResolver
			}

		})
		.when('/genres', {
			templateUrl: '/genres/genres-list.html',
			controller: genresListConrollerName,
			controllerAs: 'ctrl'
		})
		.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}

config.$inject = ['$routeProvider', '$locationProvider'];

angular
	.module(homeModuleName)
	.config(config);