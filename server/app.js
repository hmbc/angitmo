var connect = require('gulp-connect');
var bodyParser = require('body-parser');
var Rest = require('connect-rest');

var controllers = [
	require('./controllers/genres'),
	require('./controllers/albums')
];

function configureRest() {
	var options = {
		context: '/api',
		'discoverPath': 'discover'
	};
	var rest = Rest.create(options);

	controllers.forEach(function (m) {
		m.configureRoute(rest);
	})

	return rest.processRequest();
}

function startServer() {
	return connect.server({
		port: 8080,
		root: 'build',
		livereload: true,
		middleware: function () {
			return [
				bodyParser.urlencoded({ extended: true }),
				bodyParser.json(),
				configureRest()
			];
		}
	});
}

module.exports = {
	start: startServer
};