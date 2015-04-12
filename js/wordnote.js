var WordNoteApp = angular.module('WordNote', []);
var SERVER = "http://ec2-54-65-235-228.ap-northeast-1.compute.amazonaws.com:5001/";

function TimeChecker() {
    this.time = (new Date()).getTime();
    this.reset = function() {
        this.time = (new Date()).getTime();
    };
    this.getElapsed = function() {
        return (new Date()).getTime() - this.time;
    }
}

var timeChecker = new TimeChecker();

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
