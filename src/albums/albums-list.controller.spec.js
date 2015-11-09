/* global jasmine */
/* global expect */
/* global inject */
/* global beforeEach */
/* global it */
/* global describe */
import { default as moduleName} from './module';
import { controllerName, albumsResolver } from './albums-list.controller';

describe('albums/albums-list', () => {
	beforeEach(module(moduleName));
	it(controllerName + ' has albums property', inject(($controller) => {
		const albums = [];
		var controller = $controller(controllerName, { albums });

		expect(controller.albums).toBe(albums);
	}));

	it('albumsResolver returns albums by genre', () => {
		const genre = "genre name";
		let route = { current: { params: { genre } } };
		let expectedAlbums = [{}, {}, {}];

		let albumsService = jasmine.createSpyObj('albumsService', ['getByGenre']);
		albumsService.getByGenre.and.returnValue(expectedAlbums);

		var albums = albumsResolver.call(undefined, albumsService, route);

		expect(albumsService.getByGenre).toHaveBeenCalledWith(genre);
		expect(albums).toBe(expectedAlbums);
	});
})