/* global angular */
import { default as albumModuleName } from './module';

export const controllerName = "AlbumDetailsController";

/*@ngInject*/
export function albumsResolver(albumsService, $route) {
	return albumsService.getById($route.current.params.id);
}

let _album = Symbol();
let _scope = Symbol();
class AlbumDetailsController {
	/*@ngInject*/
	constructor(album, $scope) {
		this[_album] = album;
		this[_scope] = $scope;
	}

	get album() {
		return this[_album];
	}

	addToCart() {
		this[_scope].$emit('addAlbumToCart', this[_album]);
	}
}

angular
	.module(albumModuleName)
	.controller(controllerName, AlbumDetailsController);