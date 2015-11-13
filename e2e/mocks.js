/* global browser */
/* global angular */

function addMockModule() {
	function mocksModule() {
		var moduleName = 'mocks';
		console.log("starting " + moduleName);
		angular.module(moduleName, []);
		console.log("module " + moduleName + " created");
		angular.module(moduleName)
			.run(function ($httpBackend) {
				console.log("module run begin", $httpBackend);
				$httpBackend.whenGET('api/genres').respond(200, ['g1', 'g2']);
				$httpBackend.whenGET(/.*/).passThrough();
				console.log("module run end");
			});
		console.log("done.");
	}

	browser.addMockModule('mocks', mocksModule);
}

module.exports.addMockModule = addMockModule;