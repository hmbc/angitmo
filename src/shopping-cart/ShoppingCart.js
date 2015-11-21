/* global angular */
import { default as moduleName } from './module';

let _positions = Symbol();
class ShoppingCart {
	constructor() {
		this[_positions] = [];
	}

	add(position) {
		var existingPosition = this[_positions].filter((p) => p.id === position.id);

		if (existingPosition && existingPosition.length) {
			existingPosition[0].count = existingPosition[0].count + 1;
		} else {
			this[_positions].push(angular.extend({}, { count: 1 }, position));
		}
	}

	get positions() {
		return this[_positions];
	}

	get isEmpty() {
		return !this[_positions].length;
	}

	get totalCount() {
		if (!this[_positions].length) {
			return 0;
		}

		return this[_positions]
			.map((p) => p.count)
			.reduce((previousValue, currentValue) => previousValue + currentValue);
	}
}

export const modelName = 'shoppingCart';

angular
	.module(modelName)
	.constant(modelName, new ShoppingCart());