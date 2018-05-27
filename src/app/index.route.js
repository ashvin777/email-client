export default function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'loginComponent'
    });

  $urlRouterProvider.otherwise('login');
}
