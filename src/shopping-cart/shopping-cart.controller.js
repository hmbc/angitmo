/* global angular */
import { default as moduleName } from './module';

let _shoppingCart = Symbol();
class ShoppingCartConroller {
	/*@ngInject*/
	constructor(shoppingCart) {
		this[_shoppingCart] = shoppingCart;
	}
	
	get positions(){
		return this[_shoppingCart].positions;
	}
}

export const controllerName = "ShoppingCart";

angular
	.module(moduleName)
	.controller(controllerName, ShoppingCartConroller);