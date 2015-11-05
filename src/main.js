/* global angular */
import {} from './genres/main';
import {} from './albums/main';
import {} from './home/main';
import {} from './config';

import { default as homeModuleName } from './home/module';

angular.bootstrap(document, [homeModuleName]);
