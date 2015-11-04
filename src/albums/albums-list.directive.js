/* global angular */
import { default as albumsModuleName } from './module';

const directiveName = "albumsList";

class AlbumsListDirective {
	constructor() {
		this.templateUrl = 'albums/albums-list.html';
		this.restrict = 'E';
		this.replace = true;
	}
}

let directiveFactory = () => new AlbumsListDirective();
directiveFactory.$inject = [];

angular
	.module(albumsModuleName)
	.directive(directiveName, directiveFactory);

export default directiveName;