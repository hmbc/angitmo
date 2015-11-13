// for some reasons, this don't work
// export class LazyArray extends Array {
// 	constructor(promise, dataResolver) {
// 		super();
//		this._promise = promise;
// 		promise.then((data) => {
// 			let values = dataResolver ? dataResolver(data) : data;
// 			this.push(values);
// 		});
// 	}
// }

export function LazyArray(promise, dataResolver) {
	let self = this;
	self._promise = promise;
	promise.then((data) => {
		let values = dataResolver ? dataResolver(data) : data;
		values.forEach(v => self.push(v));
	});
}

LazyArray.prototype = Array.prototype;