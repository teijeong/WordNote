
WordNoteApp.controller('SubjectiveController', function($scope) {
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

    if ($scope.options.count) $scope.cnt = $scope.options.count;
    
    if ($scope.cnt >= $scope.progress.total)
        $scope.cnt = $scope.progress.total;

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

    $scope.loadProblem = function(idx) {loadProblem(idx, $scope)};
    $scope.selectAnswer = function(idx) {selectAnswer(idx, $scope);};
    $scope.keyup = function($event) {keyup($event, $scope);};
    $scope.loadProblem(0);
});

function loadProblem(idx, $scope) {
    $scope.choices = [];
    var choiceIdx = [];

    if (idx >= $scope.progress.total) return;

    $scope.problem = $scope.words[idx];
    var word = $scope.words[idx].word;

    for (var i = 0; i < $scope.cnt; i++) {
        var idx2 = Math.floor(Math.random() * $scope.words.length);
        if (idx == idx2 || choiceIdx.indexOf(idx2) != -1) {
            i--;
            continue;
        }
        choiceIdx.push(idx2);
        var meaningIdx = Math.floor(Math.random() * ($scope.words[idx2].meaning.length));
        $scope.choices.push($scope.words[idx2].meaning[meaningIdx]);
    }
    var idx2 = Math.floor(Math.random() * $scope.cnt);
    var meaningIdx = Math.floor(Math.random() * ($scope.words[idx].meaning.length));
    $scope.choices[idx2] = $scope.words[idx].meaning[meaningIdx];

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

function keyup($event, $scope) {
    if ( 1 <= $event.key && $event.key <= $scope.cnt)
        $scope.selectAnswer($event.key);
}

function selectAnswer(idx, $scope) {
    if ($scope.problemNo >= $scope.total) return;
    $("#choice-" + idx).css("background-color","#BCE8F1");
    $("#choice-" + idx).animate({
        backgroundColor: "#FFFFFF"
    }, 300);
    $scope.myAnswer = $scope.choices[idx - 1];
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
    $scope.loadProblem ($scope.problemNo);
}
