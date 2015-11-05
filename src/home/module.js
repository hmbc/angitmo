/* global angular */
import { default as genresModuleName } from '../genres/module';
import { default as albumsModuleName } from '../albums/module';

const moduleName = 'home';

angular.module(moduleName, ['ngRoute', genresModuleName, albumsModuleName]);

export default moduleName;