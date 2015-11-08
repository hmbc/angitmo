/* global angular */
import { default as genresModuleName } from './module';

export const serviceName = "genresService";

const genres = [
	'Pop', 'Rock', 'Jazz', 'Metal', 'Electronic', 'Blues', 'Latin', 'Rap',
	'Classical', 'Alternative', 'Country', 'R&B', 'Indie', 'Punk', 'World'
];

class GenresService {
	constructor() {
	}

	getGenres(max) {
		return genres;
	}
}

let factory = () => new GenresService();

angular
	.module(genresModuleName)
	.service(serviceName, factory);