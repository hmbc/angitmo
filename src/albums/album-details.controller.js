/* global angular */
import { default as albumModuleName } from './module';
import { default as albumsServiceName } from './albums.service';

export const controllerName = "AlbumDetailsController";

let _album = Symbol();
class AlbumDetailsController {
	constructor(album) {
		this[_album] = album;
	}

	get album() {
		return this[_album];
	}
}
AlbumDetailsController.$inject = ['album'];

export let albumsResolver = (albumsService, $route) => {
	return albumsService.getById($route.current.params.id);
};
albumsResolver.$inject = [albumsServiceName, '$route'];

angular
	.module(albumModuleName)
	.controller(controllerName, AlbumDetailsController);