function GenresController() {
	var self = this;

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

	self.configureRoute = function (rest) {
		rest.get('/genres', getGenres);
	}
}


module.exports = new GenresController();