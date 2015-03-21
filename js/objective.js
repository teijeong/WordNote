var wordNote=[];
var words = [];
var options;

var problemNo;
var correct, incorrect, total;

function init() {
    wordNote = JSON.parse(localStorage.getItem("wordNote"));
    options = JSON.parse(localStorage.getItem("wordNote.options"));

    if (options.reverse)
        $.each(wordNote, function(i, word) {
            wordNote[i] = [wordNote[i][1], wordNote[i][0]];
        });
    $.each(wordNote, function(i, word) {
        words.push([word[0], i]);
    });
    if (options.shuffle) words.shuffle();

    correct = incorrect = 0;
    total = wordNote.length;
    problemNo = 0;

    $("#test-info").html("0/0<br/ >0%<br /><br />");
}

function loadProblem(idx) {
    if (idx >= total) {
        problemNo = idx = total - 1;
        return;
    }
    $("#word").text(words[idx][0]);
}

function checkAnswer() {
    var isCorrect = false;
    var myAnswer = $("#answer").val();

    var answer = wordNote[words[problemNo][1]].slice();
    var question = answer[0];
    answer = answer.splice(1,1).join(', ');

    $("#answer").val("");
    if (wordNote[words[problemNo][1]].indexOf(myAnswer, 1) != -1) {
        isCorrect = true;
        correct++;
    } else
        incorrect++;



    $("#test-info").html(correct + "/" + (correct + incorrect) + "<br/ >" +
        Math.floor((correct +incorrect) / total * 100) + "%<br />");
    if (isCorrect) 
        $("#test-info").append("<span class='correct'>Correct</span><br />" +
            "[ " + question + " ] Answer: " + answer);
    else {
        $("#test-info").append("<span class='incorrect'>Incorrect (My answer: " + myAnswer + ")<br />" +
            "[ " + question + " ] Answer: " + answer);
    }
    problemNo++;
    loadProblem (problemNo);
}

$(document).ready( function() {
    $("form").submit(function(event) {
        event.preventDefault();
    });
    $("#answer").submit(function(event) {
        event.preventDefault();
        checkAnswer();
    });
    $("#checkAnswer").click(checkAnswer);
    init();
    loadProblem(problemNo);
});
