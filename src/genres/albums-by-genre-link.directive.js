/* global angular */
import { default as genresModuleName } from './module';

const directiveName = "albumsByGenreLink";

class AlbumsByGenreLinkDirective {
	constructor() {
		this.template = '<a href="/albums?genre={{ngModel.name}}">{{ngModel.name||"n/d"}} <span class="badge">{{ngModel.count}}</span> </a>';
		this.restrict = 'E';
		this.require = '=ngModel';
		this.scope = { ngModel: '=' };
		this.replace = true;
	}
}

let directiveFactory = () => new AlbumsByGenreLinkDirective();

angular
	.module(genresModuleName)
	.directive(directiveName, directiveFactory);
	
export default directiveName;