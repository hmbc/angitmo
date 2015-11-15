/* global angular */
import { default as albumsModuleName } from './module';
import { default as albumsServiceName } from './albums.service';

export const controllerName = "AlbumsListController";
class AlbumsListController {
	/*@ngInject*/
	constructor(albums) {
		this.albums = albums;
	}
}

/*@ngInject*/
export function albumsResolver(albumsService, $route) {
	return albumsService.getByGenre($route.current.params.genre);
}

angular
	.module(albumsModuleName)
	.controller(controllerName, AlbumsListController);