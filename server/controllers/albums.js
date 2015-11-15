var client = require('../elasticsearch/store-repository');

function AlbumsController() {
	var self = this;

	function getAlbumDetails(request, content, callback) {
		var id = request.parameters.id;

		return callback(null, function (cb) {
			return client
				.get(id)
				.then(function (data) {
					cb(null, data);
				});
		});
	}

	function getAlbums(request, content, callback) {
		var genre = request.parameters.genre;
		var count = request.parameters.count;

		return callback(null, function (cb) {
			client
				.searchByGenre(genre, count)
				.then(function (data) {
					cb(null, data);
				});
		});
	}


	self.configureRoute = function (rest) {
		rest.get('/album/:id', getAlbumDetails);
		rest.get('/albums', getAlbums);
	}
}

module.exports = new AlbumsController();