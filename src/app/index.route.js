export default function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/home',
      component: 'homeComponent'
    });

  $urlRouterProvider.otherwise('home');
}
