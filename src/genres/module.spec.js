/* global expect */
/* global angular */
/* global it */
/* global describe */
import { default as moduleName } from './module';

describe('genres module', () => {
	it('to be defined', () => {
		let m = angular.module(moduleName);
		expect(m).toBeDefined();
	});
});