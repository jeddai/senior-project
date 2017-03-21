describe('Test home controller', function() {
    beforeEach(angular.mock.module('titanic'));

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('should have the title', function() {
        var scope = {};
        var ctrl = $controller('HomeController', { $scope:scope });
        assert.equal(ctrl.title, 'Would you survive?');
    });
});