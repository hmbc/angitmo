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

	it('genres should injected', inject(($controller) => {
		let genres = [{}, {}, {}];
		let genresService = jasmine.createSpyObj('genresService', ['getGenres']);

		let controller = $controller(controllerName, { genres, [genresServiceName]: genresService })

		expect(controller.genres).toBe(genres);
	}));
});