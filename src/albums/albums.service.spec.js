/* global expect */
/* global inject */
/* global afterEach */
/* global angular */
/* global it */
/* global fail */
/* global xit */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import { default as serviceName } from './albums.service';

describe(moduleName + '/' + serviceName, () => {
	beforeEach(angular.mock.module(moduleName));

	var httpBackend;
	var albumsService;
	beforeEach(inject(($httpBackend, _albumsService_) => {
		httpBackend = $httpBackend;
		console.log(albumsService);
		albumsService = _albumsService_;
	}));

	afterEach(() => {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('getById returns album by id from resource', () => {
		const id = 1;
		let expected = { id };
		httpBackend.expectGET('/api/album/' + id).respond(expected);

		var actual = albumsService.getById(id);

		httpBackend.flush();
		expect(actual.id).toBe(id);
	});

	it('getTop returns top x albums', () => {
		const count = 2;
		httpBackend.expectGET('/api/albums?count=' + count).respond([]);

		albumsService.getTop(count);

		httpBackend.flush();
	});

	it('getByGenre returns albums with specyfied genre', () => {
		const genreName = "genre-name";
		httpBackend.expectGET('/api/albums?genre=' + genreName).respond([]);

		albumsService.getByGenre(genreName);

		httpBackend.flush();
	});
});