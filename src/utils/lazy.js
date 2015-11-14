/* global angular */

function buildLazy(promise, dataResolver, emptyResultBuilder, updateResult) {
	var result = emptyResultBuilder();
	result.$resolved = false;
	
	
	dataResolver = dataResolver || (data => data);
	promise.then(data => {
		updateResult(result, dataResolver(data));
		result.$resolved = true;
	});

	result.$promise = promise;

	return result;
}

class LazyFactory {
	forObject(promise, dataResolver) {
		return buildLazy(
			promise,
			dataResolver,
			() => { },
			(result, data) => angular.extend(result, data)
		);
	}

	forArray(promise, dataResolver) {
		return buildLazy(
			promise,
			dataResolver,
			() => [],
			(result, items) => items.forEach(item=> result.push(item))
		);
	}
}

export let Lazy = new LazyFactory();
