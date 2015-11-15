/* global angular */
import { default as moduleName } from './module'
import { serviceName as genresServiceName } from '../genres/genres.service';

export const controllerName = "GenresLinksController";

let _genres = Symbol();

class GenresLinksController {
  /*@ngInject*/
  constructor(genresService) {
    this[_genres] = genresService.getGenres({ max: 9 });
  }

  get genres() {
    return this[_genres];
  }
}

angular
  .module(moduleName)
  .controller(controllerName, GenresLinksController);