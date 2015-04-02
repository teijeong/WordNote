WordNoteApp.controller('FlashcardController', function($scope) {
    $scope.wordNote = JSON.parse(localStorage.getItem("wordNote"));
    $scope.options = JSON.parse(localStorage.getItem("wordNote.options"));
    $scope.problemNo = 0;
    $scope.progress = {
        correct:0,
        incorrect:0,
        total:$scope.wordNote.length
    };
    
    if ($scope.options.reverse)
        $.each($scope.wordNote, function(i, word) {
            $scope.wordNote[i] = {
                word: $scope.wordNote[i].meaning[0],
                meaning: [$scope.wordNote[i].word]
            };
        });
    if ($scope.options.shuffle) $scope.wordNote.shuffle();

    $scope.sounds = {};

    $scope.loadProblem = function(idx) {loadProblem(idx,$scope)};
    $scope.flipCard = function() {flipCard($scope);};
    $scope.keypress = function($event) { keypress($event, $scope) };
    $scope.prev = function() {$scope.loadProblem(--$scope.problemNo);};
    $scope.next = function() {$scope.loadProblem(++$scope.problemNo);};
    $scope.loadProblem(0);
});

var loadProblem = function(idx, $scope) {
    if( idx >= $scope.wordNote.length ) return;
    if( idx < 0) idx = $scope.problemNo = 0;
    $scope.progress.correct = idx + 1;
    $scope.problem = $scope.wordNote[idx];

    $scope.problem.word = $scope.problem.word.toLowerCase();

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

    $scope.flipped = $scope.options.flip;
    $scope.flipCard();

    if ($scope.options.autoplay) {
        $scope.$apply();
        setTimeout(function() {$scope.loadProblem(++$scope.problemNo);},
            $scope.options.autoplay * 1000);
    }
};

var flipCard = function($scope) {
    $scope.flipped = !$scope.flipped;
};

var keypress = function($event, $scope) {
    switch ($event.keyCode){
        case 37: // Left
            $scope.loadProblem(--$scope.problemNo);
            break;
        case 39: // Right
            $scope.loadProblem(++$scope.problemNo);
            break;
        case 32: // Space
        case 38: // Up
        case 40: // Down
            $scope.flipCard();
            break;
    }
};