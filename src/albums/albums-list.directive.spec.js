/* global expect */
/* global angular */
/* global inject */
/* global it */
/* global beforeEach */
/* global describe */
import { default as moduleName } from './module';
import {} from './albums-list.directive';

describe(moduleName + '/albums-list.directive', () => {
	const template = "<div>abc</div>";

	beforeEach(module(moduleName));
	beforeEach(inject(($templateCache) => {
		$templateCache.put('albums/albums-list.directive.html', template);
	}));


	it('use proper template', inject(($compile, $rootScope) => {
		let scope = $rootScope;
		let element = $compile(angular.element('<albums-list />'))(scope);
		scope.$digest();
		expect(element[0].outerHTML).toBe(template);
	}));
});