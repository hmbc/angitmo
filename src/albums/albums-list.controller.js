/* global angular */
import { default as albumsModuleName } from './module';
import { default as albumsServiceName } from './albums.service';

export const controllerName = "AlbumsListController";

let _albumsService = Symbol();
let _size = Symbol();
let _skip = Symbol();
let _genre = Symbol();
class AlbumsListController {
	/*@ngInject*/
	constructor(albums, albumsService, $route) {
		this.albums = albums;
		this[_albumsService] = albumsService;
		this[_size] = 10;
		this[_skip] = 0;
		this[_genre] = $route.current.params.genre;
	}

	search() {
		this[_skip] = 0;
		this.albums = this._search();
	}

	more() {
		this[_skip] = this.albums.length;
		this._search()
			.$promise
			.then(albums=> {
				albums.forEach(a=> this.albums.push(a));
			});
	}

	_search() {
		return this[_albumsService].getByFilter({
			skip: this[_skip],
			text: this.text,
			genre: this[_genre]
		});
	}
}

/*@ngInject*/
export function albumsResolver(albumsService, $route) {
	return albumsService.getByGenre($route.current.params.genre);
}

angular
	.module(albumsModuleName)
	.controller(controllerName, AlbumsListController);