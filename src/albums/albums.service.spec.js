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

	xit('getById returns album by id from resource', () => {
		fail('not implemented yet!');
	});

	xit('getTop returns top x albums', () => {
		fail('not implemented yet!');
	});

	xit('getByGenre returns albums with specyfied genre', () => {
		fail('not implemented yet!');
	});
});