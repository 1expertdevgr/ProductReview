

var productReviewApp = angular.module("productReviewApp", []);



//---------------------------------------------------------------------------------
//<productViewController>
//---------------------------------------------------------------------------------
productReviewApp.controller("productViewController", function ($scope, $http) {

    $scope.review = {
            reviewid: getNextId(),reviewedby: "",rating: 0,readonly: false,title: "",reviewdate: getCurrentDate(),likes: 0,ilikethis: false
        }

    //---Initialize the product detail view
    //---get the sample content from json file if localdb has not data.
    $scope.init = function () {
        if (localStorage.getItem("productViewData")) {
            $scope.product = JSON.parse(localStorage.getItem("productViewData"));
        }
        else {
            $http({
                url: "static/data/viewproduct.js",
                method: 'GET'
            }).then(function (response) {
                $scope.product = response.data;
                localStorage.setItem("productViewData", JSON.stringify($scope.product));
            });
        }
    }
});




//---------------------------------------------------------------------------------
//<productReviewController>
//---------------------------------------------------------------------------------
productReviewApp.controller("productReviewController", function ($scope, $http, $timeout) {

    //---Initialize the product review section
    //---get the sample content from json file if localdb has not data.
    $scope.init = function () {

        if (localStorage.getItem("productReviewData")) {
            $scope.reviews = JSON.parse(localStorage.getItem("productReviewData"));
            refreshReviewData();
        }
        else {
            $http({
                url: "static/data/reviews.js",
                method: 'GET'
            }).then(function (response) {

                $scope.reviews = response.data;
                refreshReviewData();
                localStorage.setItem("productReviewData", JSON.stringify($scope.reviews));

            });
        }
    }

   


    //---eveent fire if user will click on like button
    //---It will increase the count of like , if already liked and again click then decrease the like count
    $scope.onLikeClick = function (event, review) {
        var index = $scope.reviews.indexOf(review);

        $scope.reviews[index].ilikethis = !$scope.reviews[index].ilikethis
        if ($scope.reviews[index].ilikethis) {
            $scope.reviews[index].likes++;
        }
        else {
            $scope.reviews[index].likes--;
        }
        localStorage.setItem("productReviewData", JSON.stringify($scope.reviews));


    }

    //---Submit user's review withe information input by user e.g rating,title,description etc
    //---update the localStorage with the new entries
    //---show confirmation dialog
    $scope.postReview = function () {

        $scope.reviews.push($scope.review)
        refreshReviewData();
        localStorage.setItem("productReviewData", JSON.stringify($scope.reviews));

        alert('Thanks for posting your review !');

    }


    var refreshReviewData = function () {
        $scope.review = {
            reviewid: getNextId(),
            reviewedby: "",
            rating: 0,
            readonly: false,
            title: "",
            reviewdate: getCurrentDate(),
            likes: 0,
            ilikethis: false
        }

        $scope.average = getTotalRatingAverage($scope.reviews);
        $scope.averageRatingList = getAverageRatingList($scope.reviews);
        $scope.totalRatingCount = getTotalRatingCount($scope.reviews);
    }

});







//---------------------------------------------------------------------------------
//---Rating Directive
//---this directive is injected in html page to display the star rating functionality
//---------------------------------------------------------------------------------

productReviewApp.directive("starRating", function () {
    return {
        restrict: 'EA',
        template:
          '<ul class="star-rating" ng-class="{readonly: readonly}">' +
          '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
          '    <i class="fa fa-star"></i>' + // or &#9733
          '  </li>' +
          '</ul>',
        scope: {
            ratingValue: '=ngModel',
            max: '=?', // optional (default is 5)
            onRatingSelect: '&?',
            readonly: '=?'
        },
        link: function (scope, element, attributes) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            scope.toggle = function (index) {
                if (scope.readonly == undefined || scope.readonly === false) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelect({
                        rating: index + 1
                    });
                }
            };
            scope.$watch('ratingValue', function (oldValue, newValue) {
                if (newValue || newValue === 0) {
                    updateStars();
                }
            });
        }
    };
});

