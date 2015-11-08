/* global angular */
import { default as moduleName } from './module';
import { default as albumsServiceName } from '../albums/albums.service';

export const controllerName = "HomeController"

let _albums = Symbol();
class HomeController {
	/*@ngInject*/
	constructor(albums) {
		this[_albums] = albums;
	}

	get albums() {
		return this[_albums];
	}
}
HomeController.inject = [];

const topAlbumsCount = 6;

/*@ngInject*/
export let albumsResolver = (albumsService) => {
	return albumsService.getTop(topAlbumsCount);
};

angular
	.module(moduleName)
	.controller(controllerName, HomeController);
