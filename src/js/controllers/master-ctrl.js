/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', '$log', '$interval', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $log, $interval) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.pm2Obj = {};
    $scope.test = "bla bla";

    var t = $interval(function() {
        $log.info('ding');
        $scope.getPM2Data();
    }, 5000);
        

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
            $interval.cancel(t);
            t = undefined;
        });

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.getPM2Data = function() {
        $http.get('http://evoNode:9615').then(function(resp) {
            //$log.info(resp.data);
            $scope.pm2Obj = resp.data;
            //$log.info($scope.pm2Obj);
        }, function(err) {
            $log.error(err);
        });

    };
}