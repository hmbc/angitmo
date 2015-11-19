/* global $filter */
/* global angular */
import { default as albumsModuleName } from './module';
import { Lazy } from '../utils/lazy';

const serviceName = "albumsService";

let _http = Symbol();
class AlbumsService {
	/*@ngInject*/
	constructor($http) {
		this[_http] = $http;
	}

	getById(id) {
		return Lazy.forObject(
			this[_http].get('/api/album/' + id),
			response => response.data
			);
	}

	getTop(count) {
		return this.getByFilter({ count });
	}

	getByGenre(genre) {
		return this.getByFilter({ genre });
	}

	getByFilter(params) {
		return Lazy.forArray(
			this[_http].get('/api/albums', { params }),
			response => response.data
			);
	}
}
let serviceFactory = /*@ngInject*/ ($http) => new AlbumsService($http);

angular
	.module(albumsModuleName)
	.service(serviceName, serviceFactory);

export default serviceName;