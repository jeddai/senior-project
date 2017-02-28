(function() {

  angular.module('titanic')
    .controller('HomeController', homeController);

  function homeController() {
    var vm = this;

    vm.title = "Would you survive?";
  }

})();
