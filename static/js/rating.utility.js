/*
@@ Utility function used in product detail page
*/



//----------------------------------------------------------------
//------get the current date  function----------------------------
//----------------------------------------------------------------
function getCurrentDate() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}



//----------------------------------------------------------------------
//------get the incremented ID------------------------------------------
//----------------------------------------------------------------------
function getNextId(a_iValue) {

    var xReturnValue = 1;
    if (isNaN(a_iValue)) {
        xReturnValue = a_iValue + 1;
    }
    else {
        a_iValue = 3;
    }
}



//----------------------------------------------------------------------
//------get percentage of specific rating-------------------------------
//----------------------------------------------------------------------
function getRatingPercentage(array, rating) {
    var ratingFound = array.filter(function (a_xValue) {
        return a_xValue.rating == rating;
    });

    return parseFloat(parseInt(ratingFound.length) * 100 / parseInt(array.length)).toFixed(1);
}



//----------------------------------------------------------------------
//------get average rating of product-----------------------------------
//----------------------------------------------------------------------
function getTotalRatingAverage(array) {

    var average = parseFloat(getTotalRatingCount(array) / array.length).toFixed(1);
    return average;
}



//----------------------------------------------------------------------
//------get Total ratiing count of a product----------------------------
//----------------------------------------------------------------------
function getTotalRatingCount(array) {
    var rating = 0;
    for (var i = 0; i < array.length; i++) {
        rating += parseInt(array[i].rating);
    }

    return rating;
}



//----------------------------------------------------------------------
//------get Total specif rating count of a product----------------------
//----------------------------------------------------------------------
function getTotalCountOfSpecificRating(array, specificRating) {
    var ratingCount = 0;
    for (var i = 0; i < array.length; i++) {
        if (parseInt(array[i].rating) == specificRating)
            ratingCount++;
    }

    return ratingCount;
}

//----------------------------------------------------------------------
//------get averagelist rating of a product-----------------------------
//----------------------------------------------------------------------
function getAverageRatingList(array) {
    return [
             { rating: 5, percentage: getRatingPercentage(array, 5), total: getTotalCountOfSpecificRating(array, 5) },
             { rating: 4, percentage: getRatingPercentage(array, 4), total: getTotalCountOfSpecificRating(array, 4) },
             { rating: 3, percentage: getRatingPercentage(array, 3), total: getTotalCountOfSpecificRating(array, 3) },
             { rating: 2, percentage: getRatingPercentage(array, 2), total: getTotalCountOfSpecificRating(array, 2) },
             { rating: 1, percentage: getRatingPercentage(array, 1), total: getTotalCountOfSpecificRating(array, 1) },
             { rating: 0, percentage: getRatingPercentage(array, 0), total: getTotalCountOfSpecificRating(array, 0) }
    ]

}


