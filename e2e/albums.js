/* global by */
/* global element */
/* global expect */
/* global it */
/* global browser */
/* global beforeEach */
/* global describe */
describe('albums', function () {
	beforeEach(function () {
		browser.get('/');
	});

	it('should has at least on album link', function () {

		var albumLink = getAlbumLinkElement();
		expect(albumLink.isPresent()).toBe(true);

	});

	it('should show album details', function () {
		getAlbumLinkElement().click();
		expect(browser.getLocationAbsUrl()).toMatch(/\/album\/\d$/);
	});

	function getAlbumLinkElement() {
		return element(by.css('.album-link'));
	}
});