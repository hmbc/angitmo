/* global angular */
import { default as genresModuleName } from './module';
import { LazyArray } from '../core/LazyArray'

export const serviceName = "genresService";

let _http = Symbol();
class GenresService {
	/*ngInject*/
	constructor($http) {
		this[_http] = $http;
	}

	getGenres(max) {
		return new LazyArray(
			this[_http].get('api/genres', { params: { max: max } }),
			(response) => response.data
		);
	}
}

/*ngInject*/
function serviceFactory($http) {
	return new GenresService($http);
}

angular
	.module(genresModuleName)
	.service(serviceName, serviceFactory);