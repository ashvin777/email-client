import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';

import App from './app.vue';

import routes from './index.routes';

Vue.use(VueRouter);
Vue.use(VueMoment);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
});

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    render: h => h(App),
    router
  }).$mount('#app');
});