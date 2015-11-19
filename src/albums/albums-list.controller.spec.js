/* global angular */
/* global jasmine */
/* global expect */
/* global inject */
/* global beforeEach */
/* global it */
/* global describe */
import { default as moduleName} from './module';
import { controllerName, albumsResolver } from './albums-list.controller';

describe('albums/albums-list', () => {
	const genre = "genre name";

	beforeEach(angular.mock.module(moduleName));
	it(controllerName + ' has albums property', inject(($controller) => {
		const albums = [];
		let $route = { current: { params: { genre } } };
		var controller = $controller(controllerName, { albums, $route });

		expect(controller.albums).toBe(albums);
	}));

	it('albumsResolver returns albums by genre', () => {
		let route = { current: { params: { genre } } };
		let expectedAlbums = [{}, {}, {}];

		let albumsService = jasmine.createSpyObj('albumsService', ['getByGenre']);
		albumsService.getByGenre.and.returnValue(expectedAlbums);

		var albums = albumsResolver.call(undefined, albumsService, route);

		expect(albumsService.getByGenre).toHaveBeenCalledWith(genre);
		expect(albums).toBe(expectedAlbums);
	});
})