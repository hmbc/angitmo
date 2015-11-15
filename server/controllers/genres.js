var client = require('../elasticsearch/store-repository');

function GenresController() {
	var self = this;

	function getGenres(request, content, callback) {
		var max = request.parameters.max;
		var filter = request.parameters.filter;

		client.getGenres(filter, max)
			.then(function (data) {
				callback(null, data);
			});
	}

	self.configureRoute = function (rest) {
		rest.get('/genres', getGenres);
	}
}


module.exports = new GenresController();