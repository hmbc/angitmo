describe('home', function () {
	beforeEach(function () {
		browser.get('/');
	});

	it('should show top6 albums', function () {
		var albumsList = element.all(by.repeater('album in ctrl.albums'));
		expect(albumsList.count()).toBe(6);
	});
});