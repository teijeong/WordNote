var wordNote=[];
var words = [];
var options;

var problemNo;
var correct, incorrect, total;

WordNoteApp.controller('ObjectiveController', function($scope) {
    $scope.wordNote = JSON.parse(localStorage.getItem("wordNote"));
    $scope.options = JSON.parse(localStorage.getItem("wordNote.options"));
    $scope.problemNo = 0;
    $scope.correct = false;
    $scope.progress = {
        correct:0,
        incorrect:0,
        total:$scope.wordNote.length
    };

    $scope.words = [];
    
    if ($scope.options.reverse)
        $.each($scope.wordNote, function(i, word) {
            $scope.words.push({
                word: $scope.wordNote[i].meaning[0],
                meaning: [$scope.wordNote[i].word],
                idx: i
            });
        });
    else
        $.each($scope.wordNote, function(i, word) {
            $scope.words.push({
                word: $scope.wordNote[i].word,
                meaning: $scope.wordNote[i].meaning,
                idx: i
            });
        });
    if ($scope.options.shuffle) $scope.words.shuffle();

    $scope.sounds = {};

    $scope.loadProblem = function(idx) {loadProblem(idx,$scope)};
    $scope.checkAnswer = function() {checkAnswer($scope);};
    $scope.loadProblem(0);
});

function loadProblem(idx, $scope) {
    if (idx >= $scope.total) return;
    $scope.problem = $scope.words[idx];
    
    if ($scope.options.tts) {
        if ($scope.sounds[$scope.problem.word]) {
            var sound = new Howl({
                urls:[$scope.sounds[$scope.problem.word]]
            }).play();
        } else {
            $.ajax({
                url: server + "sound/" + $scope.problem.word,
                crossDomain: true,
                type: 'GET',
                success: function(data) {
                    var url = "http://media.merriam-webster.com/soundc11/" + data.sound;
                    $scope.sounds[$scope.problem.word] = url;
                    var sound = new Howl({
                        urls:[url]
                    }).play();
                }
            });
        }
    }
}

function checkAnswer($scope) {
    if ($scope.problemNo >= $scope.total) return;
    $scope.correct = false;
    $scope.prevAnswer = $scope.myAnswer;
    $scope.prevProblem = $scope.problem;

    var answer = $scope.problem.meaning;
    var question = $scope.problem.word;

    if (answer.indexOf($scope.myAnswer) != -1) {
        $scope.correct = true;
        $scope.progress.correct++;
    } else
        $scope.progress.incorrect++;

    $scope.problemNo++;
    $scope.myAnswer = "";
    $scope.loadProblem ($scope.problemNo);
}

