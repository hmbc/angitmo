/* global requirejs */
import {} from './albums/module.spec';
import {} from './albums/album.spec';
import {} from './albums/album-details.controller.spec';
import {} from './albums/albums-list.controller.spec';
import {} from './albums/albums.service.spec';

import {} from './genres/module.spec';
import {} from './genres/albums-by-genre-link.directive.spec';
import {} from './genres/genres-list.controller.spec';

import {} from './home/module.spec';
import {} from './home/home.controller.spec';
import {} from './home/genres-links.controller.spec';

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        'jquery': '../build/bower_components/jquery/dist/jquery'
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: [
    ],

    // start test run, once Require.js is done
    callback: function () {
        if (window.__karma__)
            return window.__karma__.start;
        return () => { };
    }
});