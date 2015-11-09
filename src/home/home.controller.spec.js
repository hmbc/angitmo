/* global jasmine */
/* global expect */
/* global beforeEach */
/* global inject */
/* global it */
/* global describe */
import { default as moduleName } from './module';
import { controllerName, albumsResolver } from './home.controller';

describe(moduleName, () => {
	beforeEach(module(moduleName));
	it(controllerName + ' has albums property', inject(($controller) => {
		let albums = [{}, {}, {}];
		let controller = $controller(controllerName, { albums });

		expect(controller.albums).toBe(albums);
	}));

	it(controllerName + ' albumsResolver get albums from albums service', () => {
		const topAlbumsCount = 6;
		let expectedAlbums = [{}, {}, {}];
		const getTop = 'getTop';
		let albumsService = jasmine.createSpyObj('albumsService', [getTop]);
		albumsService[getTop].and.returnValue(expectedAlbums);

		var albums = albumsResolver.call(undefined, albumsService);

		expect(albumsService.getTop).toHaveBeenCalledWith(topAlbumsCount);
		expect(albums).toBe(expectedAlbums);
	});
});