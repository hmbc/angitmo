/* global angular */
import { default as genresModuleName } from './module';
import { serviceName as genresServiceName } from './genres.service';

export const controllerName = "GenresListController";


let _genresService = Symbol();
class GenresListController {
	/*@ngInject*/
	constructor(genres, genresService) {
		this.genres = genres;
		this.max = 10;
		this.skip = 0;
		this[_genresService] = genresService;
	}

	search() {
		this.skip = 0;
		this.genres = this._search();
	}

	loadMore() {
		this.skip = this.skip + 10;
		this._search().$promise.then(data => {
			data.forEach(g => this.genres.push(g));
		});
	}

	_search() {
		return this[_genresService].getGenres({
			filter: this.genresFilter,
			max: this.max,
			skip: this.skip
		});
	}
}



/*@ngInject*/
export function genresResolver(genresService) {
	return genresService.getGenres();
}


angular
	.module(genresModuleName)
	.controller(controllerName, GenresListController);