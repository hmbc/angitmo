/* global angular */
/* global expect */
/* global inject */
/* global it */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import {} from './albums-by-genre-link.directive';

describe(moduleName + '/albums-by-genre-link.directive', () => {
	beforeEach(angular.mock.module(moduleName));

	it('render proper element', inject(($compile, $rootScope) => {
		const genreName = 'genre-name';
		let scope = $rootScope;
		scope.property = genreName;
		let element = $compile(angular.element('<albums-by-genre-link ng-model="property" />'))(scope);
		scope.$digest();
		expect(element[0].href).toMatch('^.*\/albums\/genre\/' + genreName + '$');
		expect(element[0].text).toBe(genreName);
	}));
});