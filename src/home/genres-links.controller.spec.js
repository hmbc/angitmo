/* global jasmine */
/* global expect */
/* global inject */
/* global it */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import { controllerName } from './genres-links.controller';
import { serviceName as genresServiceName } from '../genres/genres.service';

describe(moduleName + '/' + controllerName, () => {
	beforeEach(module(moduleName));

	it('get genres from genres service', inject(($controller) => {
		let genres = [{}, {}, {}];
		const getGenres = 'getGenres';
		let genresService = jasmine.createSpyObj('genresService', [getGenres]);
		genresService[getGenres].and.returnValue(genres);

		let controller = $controller(controllerName, { [genresServiceName]: genresService });

		expect(genresService[getGenres]).toHaveBeenCalled();
		expect(controller.genres).toBe(genres);
	}));
})
