var Promise = require('bluebird');
var elasticsearch = require('elasticsearch');
var extend = require('extend');

function Client() {
	var self = this;

	var _indexName = 'musicstore';
	var _albumTypeName = 'album';
	var _genreTypeName = 'genre';


	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'warning'
	});

	function putMapping(typeName, mapping) {
		console.log('mapping', typeName, mapping);
		return client
			.indices
			.putMapping({
				index: _indexName,
				'type': typeName,
				body: mapping
			});
	}

	function createIndex() {
		return client
			.indices
			.create({ index: _indexName })
			.then(function (data) {
				console.log('index created', data);
				var mapping = require('./mapping.json');

				return Promise.all([
					putMapping(_albumTypeName, { album: mapping.album }),
					putMapping(_genreTypeName, { genre: mapping.genre })
				]);
			});
	}

	self.recreateIndex = function () {
		var index = { index: _indexName };
		return client
			.indices
			.exists(index)
			.then(function (indexExists) {
				if (indexExists) {
					return client
						.indices
						.delete(index)
						.then(function () {
							return createIndex();
						});
				} else {
					return createIndex();
				}
			});
	}

	function index(typeName, data) {
		return client
			.index({
				'index': _indexName,
				'type': typeName,
				'body': data
			});
	}

	self.indexAlbum = function (data) {
		return index(_albumTypeName, data);
	}

	self.indexGenre = function (data) {
		return index(_genreTypeName, data);
	}

	self.getAlbum = function (id) {
		return client
			.getSource({
				index: _indexName,
				'type': _albumTypeName,
				album: true,
				_source: true,
				id: id
			})
			.then(function (data) {
				return extend(true, {}, data, { id: id });
			});
	}

	self.searchAlbumsByGenre = function (genre, size) {
		var query = { match_all: {} };
		if (genre) {
			query = {
				match: {
					genre: genre
				}
			}
		}

		var search = {
			index: _indexName,
			'type': _albumTypeName,
			size: size || 10,
			_source: true,
			body: { query: query }
		};

		return client
			.search(search)
			.then(function (data) {
				return data.hits.hits.map(function (h) { return extend(true, {}, h._source, { id: h._id }) });
			});
	}

	self.getGenres = function (filter, max, skip) {
		var query = { match_all: {} };
		if (filter) {
			query = {
				match: {
					"name.filter": filter
				}
			}
		}

		var search = {
			index: _indexName,
			'type': _genreTypeName,
			size: max || 10,
			'from': skip || 0,
			_source: true,
			sort: 'count:desc',
			body: { query: query }
		};

		return client
			.search(search)
			.then(function (data) {
				return data.hits.hits.map(function (h) { return extend(true, {}, h._source, { id: h._id }) });
			});
	}
}

module.exports = new Client();