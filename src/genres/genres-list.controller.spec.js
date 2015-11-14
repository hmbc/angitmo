/* global angular */
/* global expect */
/* global jasmine */
/* global inject */
/* global it */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import { controllerName } from './genres-list.controller'
import { serviceName as genresServiceName } from './genres.service';

describe(moduleName + '/' + controllerName, () => {
	beforeEach(angular.mock.module(moduleName));

	it('get genres from genres service', inject(($controller) => {
		let genres = [{}, {}, {}];
		let genresService = jasmine.createSpyObj('genresService', ['getGenres']);
		genresService.getGenres.and.returnValue(genres);

		let controller = $controller(controllerName, { [genresServiceName]: genresService })

		expect(genresService.getGenres).toHaveBeenCalled();
		expect(controller.genres).toBe(genres);
		expect(controller.count).toBe(genres.length);
	}));
});