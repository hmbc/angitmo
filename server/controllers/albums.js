var client = require('../elasticsearch/store-repository');

function AlbumsController() {
	var self = this;

	function getAlbumDetails(request, content, callback) {
		var id = request.parameters.id;

		return callback(null, function (cb) {
			return client
				.getAlbum(id)
				.then(function (data) {
					cb(null, data);
				});
		});
	}

	function getAlbums(request, content, callback) {
		var genre = request.parameters.genre;
		var count = request.parameters.count;
		var skip = request.parameters.skip;
		var text = request.parameters.text;

		return callback(null, function (cb) {
			client
				.searchAlbums({ genre: genre, text: text }, count, skip)
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