var client = require('../elasticsearch/store-repository');

function GenresController() {
	var self = this;

	function getGenres(request, content, callback) {
		var filter = request.parameters.filter;
		var max = parseInt(request.parameters.max, 10) || 10;
		var skip = parseInt(request.parameters.skip, 10) || 0;

		client.getGenres(filter, max + skip)
			.then(function (data) {
				if (skip)
					data.genres.splice(0, skip);
				callback(null, data);
			});
	}

	self.configureRoute = function (rest) {
		rest.get('/genres', getGenres);
	}
}


module.exports = new GenresController();