/* global angular */
/* global jasmine */
/* global spyOn */
/* global expect */
/* global it */
/* global inject */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import { controllerName, albumsResolver } from './album-details.controller';
import { } from './albums.service';

describe('albums/album-details', () => {
	beforeEach(angular.mock.module(moduleName));

	it(controllerName + ' has immutable album property', inject(($controller) => {
		const album = {};
		const scope = {};
		let controller = $controller(controllerName, { album, $scope: scope });

		expect(controller.album).toBe(album);

		controller.album = { someProperty: {} };
		expect(controller.album).toBe(album);
	}));

	it('albumsResolver returns album instance from albumsService by id from routing parameter', () => {
		const expectedAlbum = { id: 10 };
		const getById = 'getById';
		let albumsService = jasmine.createSpyObj('albumsSpy', [getById]);
		albumsService[getById].and.returnValue(expectedAlbum);
		let route = { current: { params: { id: expectedAlbum.id } } };
		let resolver = albumsResolver;

		var album = resolver(albumsService, route);

		expect(albumsService[getById]).toHaveBeenCalledWith(expectedAlbum.id);
		expect(album).toBe(expectedAlbum);
	});
});
