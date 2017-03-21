describe('Test form controller', function() {
    beforeEach(angular.mock.module('titanic'));

    var $controller, $httpBackend;

    beforeEach(inject(function(_$controller_, _$httpBackend_){
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    it('should have called the submit form function', function() {
        var scope = {};
        var ctrl = $controller('FormController', { $scope:scope });
        var redirectSpy = sinon.stub(ctrl, 'redirect');
        ctrl.form = 'form';
        $httpBackend.expectPOST('/form/submit', 'form').respond(200, { data: true });
        ctrl.submitForm();
        $httpBackend.flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation(false);
        $httpBackend.verifyNoOutstandingRequest(false);
    });
});