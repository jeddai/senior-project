(function() {

  angular.module('titanic')
    .controller('HomeController', homeController);

  function homeController() {
    var vm = this;

    vm.title = "welcome to the titanic project thingy";
  }

})();
