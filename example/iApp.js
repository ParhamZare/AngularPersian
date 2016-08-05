/**
 * Created by ParhamZare .
 * Powered By WebWell.ir
 */
var iApp = angular.module('iApp', ['iPersian'], function ($interpolateProvider) {

});
angular.module('iApp').config(['$controllerProvider', function ($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);
function mainController($scope, $filter) {
    $scope.persianNowDay = '1395/1/1';
    $scope.gregorianNowDay = '2016-08-04';
    $scope.price = '1000000';
    $scope.price2 = '10000000';
    $scope.Convert = function () {
        $scope.Converted = $filter(($scope.typeConvert === 'gtop' ? 'pDate' : 'eDate'))($scope.myDate);
    }
}