/* global $filter */
/* global angular */
import { default as albumsModuleName } from './module';
import { Album } from './album';

const serviceName = "albumsService";

const albums = [
	new Album(1, "Slayer"),
	new Album(2, "Moonspell"),
	new Album(3, "Możdżer"),
	new Album(4, "Madball"),
	new Album(5, "Terror"),
	new Album(6, "Arkangel"),
	new Album(7, "Death"),
	new Album(8, "Antrax"),
	new Album(9, "Born from Pain"),
	new Album(10, "zao"),
	new Album(11, "wolf down"),
	new Album(12, "mushroomhead"),
	new Album(13, "The Dillinger Escape Plan"),
	new Album(14, "Toxic Bonkers")
];

let _limitTo = Symbol();
let _filter = Symbol();
class AlbumsService {
	constructor($filter) {
		this[_limitTo] = $filter('limitTo');
		this[_filter] = $filter('filter');
	}

	getById(id) {
		var matching = this[_filter](albums, { id: Number.parseInt(id, 10) }, true);
		return matching.length ? matching[0] : {};
	}

	getTop(count) {
		return this[_limitTo](albums, count);
	}

	getByGenre(genre) {
		return this[_filter](albums, { genre: genre }, true);
	}
}
let serviceFactory = ($filter) => new AlbumsService($filter);
serviceFactory.$inject = ['$filter'];

angular
	.module(albumsModuleName)
	.service(serviceName, serviceFactory);

export default serviceName;