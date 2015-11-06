export class Album {
	constructor(id, artist, name, genre, price) {
		this.id = id;
		this.artist = artist;
		this.name = name || artist;
		this.genre = genre || "Metal";
		this.price = price || 0;
	}

	get title() {
		return this.artist + " - " + this.name;
	}
}