/* global expect */
/* global browser */
/* global it */
/* global describe */
describe('e2e', function () {
	it('should automatically redirect to / when location hash/fragment is empty', function () {
		browser.get('/');
		expect(browser.getLocationAbsUrl()).toMatch("/");
	});
})