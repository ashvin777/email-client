import { STATES } from './index.constants';

import LoginComponent from './components/login/login.vue';
import HomeComponent from './components/home/home.vue';
import LoadingComponent from './components/loading/loading.vue';

export default [
  { path: STATES.LOGIN, component: LoginComponent },
  { path: STATES.HOME, component: HomeComponent },
  { path: STATES.LOADING, component: LoadingComponent }
];