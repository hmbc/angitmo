var client = require('../elasticsearch/client');

function GenresController() {
	var self = this;

	function getGenres(request, content, callback) {
		var max = request.parameters.max;

		client.getGenres(max)
			.then(function (data) {
				callback(null, data.aggregations.genres.buckets.map(function (b) { 
					return {
						genre: b.key,
						albumsCount:b.doc_count
					}; 
				}));
			});
	}

	self.configureRoute = function (rest) {
		rest.get('/genres', getGenres);
	}
}


module.exports = new GenresController();