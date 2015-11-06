let _id = Symbol();
let _artist = Symbol();
let _name = Symbol();
let _genre = Symbol();
let _price = Symbol();

export class Album {
	constructor(id, artist, name, genre, price) {
		this[_id] = id;
		this[_artist] = artist;
		this[_name] = name || artist;
		this[_genre] = genre || "Metal";
		this[_price] = price || 0;
	}

	get id() {
		return this[_id];
	}

	get artist() {
		return this[_artist];
	}

	get name() {
		return this[_name];
	}

	get genre() {
		return this[_genre];
	}

	get price() {
		return this[_price];
	}

	get title() {
		return this.artist + " - " + this.name;
	}
}