/* global moment:false */

import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';
import './components/';


angular.module('app', [
    'ngSanitize',
    'ui.router',
    'app.components'
  ])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock);

angular.element(document).ready(function () {
  angular.bootstrap(angular.element(document.body), ['app']);
});
