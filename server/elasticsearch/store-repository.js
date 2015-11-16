var elasticsearch = require('elasticsearch');
var extend = require('extend');

function Client() {
	var self = this;

	var _indexName = 'musicstore';
	var _typeName = 'disc';


	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'warning'
	});

	self.removeIndex = function () {
		var index = { index: _indexName };
		if (client.indices.exists(index)) {
			console.log('deleting index', _indexName);
			client.indices.delete(index);
		};
	}

	self.index = function (data, cb) {
		client
			.index({
				'index': _indexName,
				'type': _typeName,
				'body': data
			})
			.then(function () {
				cb();
			})

	}

	self.get = function (id) {
		return client.getSource({
			index: _indexName,
			'type': _typeName,
			realtime: true,
			_source: true,
			id: id
		})
			.then(function (data) {
				return extend(true, {}, data, { id: id });
			});
	}

	self.searchByGenre = function (genre, size) {
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
			'type': _typeName,
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

	self.getGenres = function (filter, max) {
		if (filter) {
			return client.search({
				index: _indexName,
				'type': _typeName,
				size: 0,
				body: {
					aggs: {
						genres: {
							filter: {
								term: {
									genre: filter
								}
							},
							aggs: {
								genres: {
									terms: {
										field: "genre",
										size: max || 10
									}
								}
							}
						},
						genres_count: {
							cardinality: {
								field: 'genre'
							}
						}
					}
				}
			})
				.then(function (data) {
					return {
						genres: data.aggregations.genres.genres.buckets.map(function (b) {
							return {
								genre: b.key,
								albumsCount: b.doc_count
							};
						}),
						total: data.aggregations.genres_count.value
					};
				});
		} else {
			return client.search({
				index: _indexName,
				'type': _typeName,
				size: 0,
				body: {
					aggs: {
						genres: {
							terms: {
								field: 'genre',
								size: max || 10,
							}
						},
						genres_count: {
							cardinality: {
								field: 'genre'
							}
						}
					}
				}
			})
				.then(function (data) {
					return {
						genres: data.aggregations.genres.buckets.map(function (b) {
							return {
								genre: b.key,
								albumsCount: b.doc_count
							};
						}),
						total: data.aggregations.genres_count.value
					};
				});
		}

	}
}

module.exports = new Client();