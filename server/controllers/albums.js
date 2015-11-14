function Album(id, artist, name, genre, price) {
	var self = this;

	self.id = id;
	self.artist = artist;
	self.name = name || artist;
	self.genre = genre || "Metal";
	self.price = price || 0;

	self.title = self.artist + " - " + self.name
}

function AlbumsController() {
	var self = this;

	var albums = [
		new Album(1, "Slayer"),
		new Album(2, "Moonspell"),
		new Album(3, "Możdżer"),
		new Album(4, "Madball"),
		new Album(5, "Terror"),
		new Album(6, "Arkangel"),
		new Album(7, "Death"),
		new Album(8, "Antrax"),
		new Album(9, "Born from Pain"),
		new Album(10, "zao"),
		new Album(11, "wolf down"),
		new Album(12, "mushroomhead"),
		new Album(13, "The Dillinger Escape Plan"),
		new Album(14, "Toxic Bonkers")
	];

	function getAlbumDetails(request) {
		var id = parseInt(request.parameters.id, 10);
		var matchingFilters = albums.filter(function (a) {
			return a.id === id;
		})
		return matchingFilters.length ? matchingFilters[0] : {};
	}

	function getAlbums(request) {
		var genre = request.parameters.genre;
		var count = request.parameters.count || albums.length;

		return albums
			.filter(function (a) {
				return a.genre === (genre || a.genre);
			})
			.slice(0, count);
	}


	self.configureRoute = function (rest) {
		rest.get('/album/:id', getAlbumDetails);
		rest.get('/albums', getAlbums);
	}
}

module.exports = new AlbumsController();