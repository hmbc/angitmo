/* global angular */
import { default as homeModuleName } from './home/module'
import { controllerName as homeControllerName, albumsResolver as homeControllerAlbumsResolver } from './home/home.controller'
import { controllerName as genresListConrollerName, genresResolver as genresListControllerResolver } from './genres/genres-list.controller'
import { controllerName as albumsListControllerName, albumsResolver as albumsListControllerResolver } from './albums/albums-list.controller';
import { controllerName as albumDetailsControllerName, albumsResolver as albumDetailsResolver } from './albums/album-details.controller';
import { controllerName as shoppingCartControllerName } from './shopping-cart/shopping-cart.controller';

/*@ngInject*/
function config($routeProvider, $locationProvider, $resourceProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/home/home.html',
			controller: homeControllerName,
			controllerAs: 'ctrl',
			resolve: {
				albums: homeControllerAlbumsResolver
			}
		})
		.when('/albums/:id', {
			templateUrl: '/albums/album-details.html',
			controller: albumDetailsControllerName,
			controllerAs: 'ctrl',
			resolve: {
				album: albumDetailsResolver
			}

		})
		.when('/albums', {
			templateUrl: '/albums/albums-list.html',
			controller: albumsListControllerName,
			controllerAs: 'ctrl',
			resolve: {
				albums: albumsListControllerResolver
			}
		})
		.when('/genres', {
			templateUrl: '/genres/genres-list.html',
			controller: genresListConrollerName,
			controllerAs: 'ctrl',
			resolve: {
				genres: genresListControllerResolver
			}
		})
		.when('/shopping-cart', {
			templateUrl: '/shopping-cart/shopping-cart.html',
			controller: shoppingCartControllerName,
			controllerAs: 'ctrl'
		})
		.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	// Don't strip trailing slashes from calculated URLs
	$resourceProvider.defaults.stripTrailingSlashes = false;
}

angular
	.module(homeModuleName)
	.config(config);