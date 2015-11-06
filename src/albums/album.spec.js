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

	let createAlbum = () => new Album(id, artist, name, genre, price);
	let assertAlbum = (album) => {
		expect(album.id).toBe(id);
		expect(album.artist).toBe(artist);
		expect(album.name).toBe(name);
		expect(album.genre).toBe(genre);
		expect(album.price).toBe(price);
	};

	it("can be created via constructor", () => {
		let album = createAlbum();

		expect(album).toBeDefined();
		assertAlbum(album);
	});

	it("is immutable", () => {
		let album = createAlbum();
		album.id = 145;
		album.artist = "new artist";
		album.name = "new name";
		album.genre = "new genre";
		album.price = 145;

		assertAlbum(album);
	});
})