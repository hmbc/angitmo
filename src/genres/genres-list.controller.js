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
		this[_genresService] = genresService;
	}
	
	search() {
		this.max = 10;
		this._search();
	}
	
	more(){
		this.max = this.max + 10;
		this._search();
	}
	
	_search(){
		this.genres = this[_genresService].getGenres({
			filter: this.genresFilter,
			max: this.max
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