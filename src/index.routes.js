import { STATES } from './index.constants';

import LoginComponent from './components/login/login.vue';
import HomeComponent from './components/home/home.vue';

export default [
  { path: STATES.LOGIN, component: LoginComponent },
  { path: STATES.HOME, component: HomeComponent }
];