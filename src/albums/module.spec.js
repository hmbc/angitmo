/* global angular */
/* global describe */
/* global it */
/* global expect */
import { default as moduleName } from './module';

describe('album module', () => {
	it('to be defined', () => {
		let m = angular.module(moduleName);
		expect(m).toBeDefined();
	});
})