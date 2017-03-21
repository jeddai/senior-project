(function () {

    angular.module('titanic')
        .controller('FormController', formController)
        .filter('range', range);

    function formController($http) {
        var vm = this;

        vm.submitForm = submitForm;
        vm.redirect = redirect;

        function submitForm() {
            $http.post('/form/submit', vm.form)
                .then(function (res) {
                    if (res.data.survived) {
                        vm.redirect('/form/survived');
                    } else {
                        vm.redirect('/form/died');
                    }
                });
        }

        function redirect(url) {
            window.location.href(url);
        }
    }

    function range() {
        return function (input, total) {
            total = parseInt(total);

            for (var i = 0; i < total; i++) {
                input.push(i);
            }

            return input;
        };
    }
})();
