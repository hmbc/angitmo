/* global requirejs */
import {} from './albums/album.spec';

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        'jquery': '../build/bower_components/jquery/dist/jquery'
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: ['./albums/album.spec'],

    // start test run, once Require.js is done
    callback: window.__karma__.start
});