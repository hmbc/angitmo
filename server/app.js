var connect = require('gulp-connect');
var bodyParser = require('body-parser');
var Rest = require('connect-rest');


var genres = [
	'Pop', 'Rock', 'Jazz', 'Metal', 'Electronic', 'Blues', 'Latin', 'Rap',
	'Classical', 'Alternative', 'Country', 'R&B', 'Indie', 'Punk', 'World'
];

function getGenres(request) {
	var max = request.parameters.max;
	var filter = request.parameters.filter;

	return genres
		.filter(function (g) { return !!g.match(filter); })
		.slice(0, max);
}

function configureRest() {
	var options = {
		context: '/api',
		'discoverPath': 'discover'
	};
	var rest = Rest.create(options);

	rest.get('/genres', getGenres);

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