/* global moment:false, gapi */

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
