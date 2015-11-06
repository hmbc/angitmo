/* global describe */
/* global it */
/* global expect */

import { Album } from './album'

describe("album", () => {
	const id = 1;
	const artist = "artist name";
	const name = "album name";
	const genre = "genre name";
	const price = 10.9;

	it("can be created via constructor", () => {
		let album = new Album(id, artist, name, genre, price);

		expect(album).toBeDefined();
		expect(album.id).toBe(id);
		expect(album.artist).toBe(artist);
		expect(album.name).toBe(name);
		expect(album.genre).toBe(genre);
		expect(album.price).toBe(price);
	})
})