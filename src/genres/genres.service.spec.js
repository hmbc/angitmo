/* global angular */
/* global afterEach */
/* global expect */
/* global inject */
/* global beforeEach */
/* global it */
/* global describe */
import { default as moduleName } from './module';
import { serviceName } from './genres.service';
import {} from '../utils/jasmine-matchers';


describe(moduleName + '/' + serviceName, () => {
	const genres = ['1', '2', '3'];
	var httpBackend;

	beforeEach(angular.mock.module(moduleName));
	beforeEach(inject(($httpBackend) => {
		httpBackend = $httpBackend;
	}));

	afterEach(() => {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('getGenres() returns all genres', inject((genresService) => {
		httpBackend.expectGET('api/genres').respond(genres);

		var actual = genresService.getGenres();
		httpBackend.flush();
		expect(actual).toMatchArray(genres);
	}));
});