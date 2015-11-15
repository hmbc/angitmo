var client = require('../elasticsearch/client');
var extend = require('extend');

// function Album(id, artist, name, genre, price) {
// 	var self = this;
// 
// 	self.id = id;
// 	self.artist = artist;
// 	self.name = name || artist;
// 	self.genre = genre || "Metal";
// 	self.price = price || 0;
// 
// 	self.title = self.artist + " - " + self.name
// }

function AlbumsController() {
	var self = this;

	function getAlbumDetails(request, content, callback) {
		var id = request.parameters.id;

		return callback(null, function (cb) {
			return client.get(id)
				.then(function (data) {
					var result = extend(true, {}, data, { id: id });
					cb(null, result);
				});
		});
	}

	function getAlbums(request, content, callback) {
		var genre = request.parameters.genre;
		var count = request.parameters.count;

		return callback(null, function (cb) {
			client.searchByGenre(genre, count)
				.then(function (data) {
					var result = data.hits.hits.map(function (h) { return extend(true, {}, h._source, { id: h._id }) });
					cb(null, result);
				});
		});
	}


	self.configureRoute = function (rest) {
		rest.get('/album/:id', getAlbumDetails);
		rest.get('/albums', getAlbums);
	}
}

module.exports = new AlbumsController();