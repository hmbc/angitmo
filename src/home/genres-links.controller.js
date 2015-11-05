/* global angular */
import { default as moduleName } from './module'
import { serviceName as genresServiceName } from '../genres/genres.service';

export const controllerName = "GenresLinksController";

let _genres = Symbol();

class GenresLinksController {
  constructor(genresService) {
    this[_genres] = genresService.getGenres();
  }

  get genres() {
    return this[_genres];
  }
}

GenresLinksController.$inject = [genresServiceName];

angular
  .module(moduleName)
  .controller(controllerName, GenresLinksController);