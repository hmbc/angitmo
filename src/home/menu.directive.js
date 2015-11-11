/* global angular */
import { default as moduleName } from './module';

const directiveName = 'menu';

class MenuDirective {
	constructor() {
		this.templateUrl = 'home/menu.directive.html';
		this.restrict = 'E';
		this.replace = true;
	}
}

let directiveFactory = () => new MenuDirective();

angular
	.module(moduleName)
	.directive(directiveName, directiveFactory);

export default directiveName;