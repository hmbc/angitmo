/* global it */
/* global fail */
/* global xit */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import { default as serviceName } from './albums.service';

describe(moduleName + '/' + serviceName, () => {
	beforeEach(module(moduleName));

	it('getById returns album by id from resource', () => {
		fail('not implemented yet!');
	});

	it('getTop returns top x albums', () => {
		fail('not implemented yet!');
	});

	it('getByGenre returns albums with specyfied genre', () => {
		fail('not implemented yet!');
	});
});