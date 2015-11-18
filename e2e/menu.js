/* global expect */
/* global it */
/* global browser */
/* global describe */
/* global protractor */
/* global by */
/* global element */
/* global beforeEach */
describe('index.html', function () {
	beforeEach(function () {
		browser.get('/');
	});

	it('has \'home\' link', function () {
		var homeLink = getMenuHomeLink();
		expect(homeLink.isPresent()).toBe(true);
	});

	if ('\'home\' link should redirect to /', function () {
		getMenuHomeLink().click();
		expect(browser.getLocationAbsUrl()).toMatch("/");
	});

	it('should show 9 genres in menu', function () {
		var genresLinks = getMenuGenresLinks();
		expect(genresLinks.count()).toBe(9);
	});

	it('has store menu link', function () {
		var storeMenuLink = getStoreMenuLink();
		expect(storeMenuLink.isPresent()).toBe(true);
	});

	it('genre link should redirect to /albums/genre?genre=', function () {
		getStoreMenuLink().click();
		getMenuGenresLinks().first().click();

		expect(browser.getLocationAbsUrl()).toMatch(/albums\?genre=.*$/);
	});

	it('store menu has \'more\' link', function () {
		var moreLink = getStoreMenuMoreLlink();
		expect(moreLink.isPresent()).toBe(true);
	});

	it('store menu \'more\' link redirects to /genres', function () {
		getStoreMenuLink().click();
		getStoreMenuMoreLlink().click();

		expect(browser.getLocationAbsUrl()).toMatch("/genres");
	});

	function getMenuHomeLink() {
		return element(by.css('.menu-home-link'));
	}

	function getMenuGenresLinks() {
		return element.all(by.repeater('genre in ctrl.genres'));
	}

	function getStoreMenuLink() {
		return element(by.css("a.store-menu-link"));
	}

	function getStoreMenuMoreLlink() {
		return element(by.css('a.store-menu-more-link'));
	}
});