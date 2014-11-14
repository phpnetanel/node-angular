describe('homeController', function() {

  beforeEach(module('app'));

  var ctrl, scope;

  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();

    ctrl = $controller('homeController', {
      $scope: scope
    });
  }));

    it('should create $scope.greeting when calling sayHello', 
    function() {
      expect(scope.greeting).toBeUndefined();
      scope.sayHello();
      expect(scope.greeting).toEqual("Hello Ari");
  });
})