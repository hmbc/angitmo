exports.config = {
	allScriptsTimeout: 11000,

// 	specs: [
// 		'./build/build.e2e.js'
// 	],
// 
	capabilities: {
		'browserName': 'chrome'
	},

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};