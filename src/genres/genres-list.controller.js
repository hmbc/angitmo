/* global angular */
import { default as genresModuleName } from './module';
import { serviceName as genresServiceName } from './genres.service';

export const controllerName = "GenresListController";

let _genres = Symbol();
class GenresListController {
	/*@ngInject*/
	constructor(genresService) {
		this[_genres] = genresService.getGenres();
	}

	get genres() {
		return this[_genres];
	}

	get count() {
		return this.genres.length;
	}
}

angular
	.module(genresModuleName)
	.controller(controllerName, GenresListController);