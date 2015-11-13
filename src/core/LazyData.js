/* global angular */
let _setValue = Symbol();
let _value = Symbol();

export class LazyData {
	constructor(promise, dataResolver) {
		this._promise = promise;
		promise.then((data) => {
			let value = dataResolver ? dataResolver(data) : data;
			angular.extend(this, value);
		});
	}
}