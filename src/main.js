import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import VueEditor from 'vue2-editor'

import App from './app.vue';

import routes from './index.routes';

Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VueEditor);

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