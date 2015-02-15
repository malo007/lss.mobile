angular.module('starter.directives', [])

.directive('keyboardHandler', function ($window, $rootScope) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            //console.log('directive keyboardHandler');//
            angular.element($window).bind('native.keyboardshow', function() {
                element.addClass('tabs-item-hide');
            });
            $rootScope.$on('app.tabshide', function() {
                element.addClass('tabs-item-hide');
            });

            angular.element($window).bind('native.keyboardhide', function() {
                element.removeClass('tabs-item-hide');
            });
            $rootScope.$on('app.tabsshow', function() {
                element.removeClass('tabs-item-hide');
            });
        }
    };
})

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            //console.log('directive hideTabs enter');//
            $rootScope.$emit('app.tabshide', '');
            $scope.$on('$destroy', function() {
                $rootScope.$emit('app.tabsshow', '');
                //console.log('directive hideTabs exit');// 
            });
        }
    };
})
;
