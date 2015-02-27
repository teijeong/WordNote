var wordNote=[];
var words = [];

var problemNo;
var correct, incorrect, total;
var cnt = 8;

function init() {
    wordNote = JSON.parse(localStorage.getItem("wordNote"));
    options = JSON.parse(localStorage.getItem("wordNote.options"));

    if (options.reverse)
        $.each(wordNote, function(i, word) {
            wordNote[i] = [wordNote[i][1], wordNote[i][0]];
        });
    if (options.count) cnt = options.count;
    $.each(wordNote, function(i, word) {
        words.push([word[0], i]);
    });

    correct = incorrect = 0;
    total = wordNote.length;
    problemNo = Math.floor(Math.random() * total);

    $("#test-info").html("0/0<br/ >0%<br /><br />");

    for (var i = 1; i <= cnt; i++)
        $("#choices").append(
            "<div class='list-group-item'id='choice-" + i + "'>" +
            "[" + i + "] <span class='meaning'></span></div>");

    $("#choices div").click(function() {
        var idx = $(this).attr("id").substr(7);
        selectAnswer(idx);
    });
}

function loadProblem(idx, cnt) {
    var choices = [];
    var choiceIdx = [];
    for (var i = 0; i < cnt; i++) {
        var idx2 = Math.floor(Math.random() * wordNote.length);
        if (words[idx][1] == idx2 || choiceIdx.indexOf(idx2) != -1) {
            i--;
            continue;
        }
        choiceIdx.push(idx2);
        var meaning = Math.floor(Math.random() * (wordNote[idx2].length - 1)) + 1;
        choices.push(wordNote[idx2][meaning]);
    }
    var idx2 = Math.floor(Math.random() * cnt);
    var meaning = Math.floor(Math.random() * (wordNote[words[idx][1]].length - 1)) + 1;
    choices[idx2] = wordNote[words[idx][1]][meaning];
    $("#word").text(words[idx][0]);
    $.each(choices, function(i, choice) {
        $("#choice-" + (i + 1) + " .meaning").text(choice);
    });
}

$("body").keyup(function(event) {
    if ( 1 <= event.key <= cnt)
        selectAnswer(event.key);
});

function selectAnswer(idx) {
    $("#choice-" + idx).css("background-color","#BCE8F1");
    $("#choice-" + idx).animate({
        backgroundColor: "#FFFFFF"
    }, 300);
    var myAnswer = $("#choice-" + idx + " span").text();
    var isCorrect = false;

    var answer = wordNote[words[problemNo][1]].slice();
    var question = answer[0];
    answer = answer.splice(1,1).join(', ');

    if (wordNote[words[problemNo][1]].indexOf(myAnswer, 1) != -1) {
        isCorrect = true;
        correct++;
    } else
        incorrect++;

    $("#test-info").html(correct + "/" + (correct + incorrect) + "<br/ >" +
        Math.floor((correct +incorrect) / total * 100) + "%<br />");
    if (isCorrect) 
        $("#test-info").append("<span class='correct'>Correct<br />" +
            "[ " + question + " ] Answer: " + answer + "</span>");
    else {
        $("#test-info").append("<span class='incorrect'>Incorrect (My answer: " + myAnswer + ")<br />" +
            "[ " + question + " ] Answer: " + answer);
    }
    words.splice(problemNo, 1);
    problemNo = Math.floor(Math.random() * words.length)
    loadProblem (problemNo, cnt);
}

$(document).ready( function() {
    init();
    loadProblem(problemNo, cnt);
});