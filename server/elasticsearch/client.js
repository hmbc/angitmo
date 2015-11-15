var elasticsearch = require('elasticsearch');

function Client() {
	var self = this;

	var _indexName = 'musicstore';
	var _typeName = 'disc';


	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'warning'
	});

	self.removeIndex = function () {
		console.log('deleting index', _indexName);

		client.indices.delete({
			index: _indexName
		});
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

		return client.search(search);
	}

	self.getGenres = function (max) {
		var search = {
			index: _indexName,
			'type': _typeName,
			body: {
				aggs: {
					'genres':{
						terms:{
							field:'genre',
							size: max || 100,
						}
					}
				}
			}
		};

		return client.search(search);
	}
}

module.exports = new Client();