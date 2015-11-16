/* global angular */

function buildLazy(promise, dataResolver, emptyResultBuilder, updateResult) {
	var result = emptyResultBuilder();
	result.$resolved = false;
		
	dataResolver = dataResolver || (data => data);
	result.$promise = promise.then(data => {
		updateResult(result, dataResolver(data));
		result.$resolved = true;
		return result;
	});

	return result;
}

class LazyFactory {
	forObject(promise, dataResolver, emptyResultBuiler) {
		return buildLazy(
			promise,
			dataResolver,
			emptyResultBuiler || (() => { return {} }),
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
