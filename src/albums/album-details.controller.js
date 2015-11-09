/* global angular */
import { default as albumModuleName } from './module';
import { default as albumsServiceName } from './albums.service';

export const controllerName = "AlbumDetailsController";

/*@ngInject*/
export function albumsResolver(albumsService, $route) {
	return albumsService.getById($route.current.params.id);
}

let _album = Symbol();
class AlbumDetailsController {
	/*@ngInject*/
	constructor(album) {
		this[_album] = album;
	}

	get album() {
		return this[_album];
	}
}

angular
	.module(albumModuleName)
	.controller(controllerName, AlbumDetailsController);