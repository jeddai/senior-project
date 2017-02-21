(function () {

    angular.module('titanic')
        .controller('FormController', formController)
        .filter('range', range);

    function formController($http) {
        var vm = this;

        vm.submitForm = submitForm;

        function submitForm() {
            $http.post('/form/submit', vm.form)
                .then(function (res) {
                    if (res.data.survived) {
                        window.location.href('/form/survived');
                    } else {
                        window.location.href('/form/died');
                    }
                });
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
