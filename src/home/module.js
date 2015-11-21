/* global angular */
import { default as genresModuleName } from '../genres/module';
import { default as albumsModuleName } from '../albums/module';
import { default as shoppingCartModuleName } from '../shopping-cart/module';

const moduleName = 'home';

angular.module(moduleName, ['ngRoute', genresModuleName, albumsModuleName, shoppingCartModuleName]);

export default moduleName;