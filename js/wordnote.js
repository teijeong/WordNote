var WordNoteApp = angular.module('WordNote', []);
var server = "http://ec2-54-65-235-228.ap-northeast-1.compute.amazonaws.com:5001/";

WordNoteApp.directive('progressbar', function() {
    return {
        restrict:'E',
        scope: {
            progress:'=progress'
        },
        templateUrl: "progressbar.html"
    };
});

Array.prototype.shuffle = function() {
    var size = this.length;
    for (var i = 0; i < size; i++) {
        var j = Math.floor(Math.random() * size);
        if (i !== j) {
            var tmp = this[i];
            this[i] = this[j];
            this[j] = tmp;
        }
    }
};
