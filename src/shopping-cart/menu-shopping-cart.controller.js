/* global angular */
import { default as moduleName } from './module';
import {} from './ShoppingCart';

export const controllerName = 'MenuShoppingCartController'

let _shoppingCart = Symbol();
class MenuShoppingCartController {
	/*@ngInject*/
	constructor($rootScope, shoppingCart) {
		this[_shoppingCart] = shoppingCart;

		$rootScope.$on('addAlbumToCart', (event, album) => {
			this[_shoppingCart].add(album);
		});
	}

	get isEmpty() {
		return this[_shoppingCart].isEmpty;
	}

	get totalCount() {
		return this[_shoppingCart].totalCount;
	}
}

angular
	.module(moduleName)
	.controller(controllerName, MenuShoppingCartController);