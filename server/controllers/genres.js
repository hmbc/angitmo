var client = require('../elasticsearch/store-repository');

function GenresController() {
	var self = this;

	function getGenres(request, content, callback) {
		var filter = request.parameters.filter;
		var max = request.parameters.max;
		var skip = request.parameters.skip;

		client.getGenres(filter, max, skip)
			.then(function (data) {
				callback(null, data);
			});
	}

	self.configureRoute = function (rest) {
		rest.get('/genres', getGenres);
	}
}


module.exports = new GenresController();