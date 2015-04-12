WordNoteApp.controller('ResultController', function($scope) {
    $scope.results = JSON.parse(localStorage.getItem("wordNote.results"));
    $scope.results.sort(compareResult);
    $scope.testInfo = JSON.parse(localStorage.getItem("wordNote.testInfo"));
    $scope.testInfo.score = $scope.testInfo.correct / $scope.testInfo.total * 100;
});

var compareResult = function(a, b) {
    if (a.correct)
        return b.correct? (b.time - a.time): 1;
    else
        return b.correct? -1: (b.time - a.time);
};