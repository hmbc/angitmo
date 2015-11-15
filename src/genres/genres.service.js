/* global angular */
import { default as genresModuleName } from './module';
import { Lazy } from '../utils/lazy'

export const serviceName = "genresService";

let _http = Symbol();
class GenresService {
	/*ngInject*/
	constructor($http) {
		this[_http] = $http;
	}

	getGenres(params) {
		return Lazy.forObject(
			this[_http].get('/api/genres', { params: params }),
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