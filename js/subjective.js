var wordNote=[['A','alpha', 'ai'],['B','bravo', 'bee'],['C','charlie', 'cirrus'],['D','delta', 'Dover'],
    ['E','echo', 'edelweiss'],['F','foxtrot', 'finch'],['G','golf', 'gulf'],['H','hotel', 'hime'],['I','india', 'icarus']];
var words = [];

var problemNo;
var correct, incorrect, total;
var cnt = 8;

function init() {
    wordNote = JSON.parse(localStorage.getItem("wordNote"));
    $.each(wordNote, function(i, word) {
        words.push([word[0], i]);
    });
    correct = 0;
    incorrect = 0;
    total = wordNote.length;
    problemNo = Math.floor(Math.random() * total);
    $("#test-info").html(correct + "/" + (correct + incorrect) + "<br/ >" +
        Math.floor((correct +incorrect) / total * 100) + "%") ;
    for (var i = 1; i <= cnt; i++)
        $("#choices").append(
            "<a href='#' class='list-group-item'id='choice-" + i + "'>" +
            "[" + i + "] <span class='meaning'></span></a>");
}

function loadProblem(idx, cnt) {
    var choices = [];
    for (var i = 0; i < cnt; i++) {
        var idx2 = Math.floor(Math.random() * wordNote.length);
        if (words[idx][1] == idx2) {
            i--;
            continue;
        }
        var meaning = Math.floor(Math.random() * (wordNote[idx2].length - 1)) + 1;
        choices.push(wordNote[idx2][meaning]);
    }
    var idx2 = Math.floor(Math.random() * cnt);
    var meaning = Math.floor(Math.random() * (wordNote[idx2].length - 1)) + 1;
    choices[idx2] = wordNote[words[idx][1]][meaning];
    $("#word").text(words[idx][0]);
    $.each(choices, function(i, choice) {
        $("#choice-" + (i + 1) + " .meaning").text(choice);
    });
}

$("body").keyup(function(event) {
    var key = event.which - 48;
    if ( key >= 1 && key <= cnt) {
        $("#choice-" + (event.which - 48)).css("background","#BCE8F1");
        $("#choice-" + (event.which - 48)).animate({
            backgroundColor: "#FFFFFF"
        }, 300);
    } else return;
    var answer = $("#choice-" + key + " span").text();
    var isCorrect = false;
    for (var i = 1; i < wordNote[words[problemNo][1]].length; i++) {
        if (answer == wordNote[words[problemNo][1]][i]) {
            isCorrect = true;
            correct++;
            break;
        }
    }
    if (!isCorrect)
        incorrect++;
    $("#test-info").html(correct + "/" + (correct + incorrect) + "<br/ >" +
        Math.floor((correct +incorrect) / total * 100) + "%") ;
    words.splice(problemNo, 1);
    problemNo = Math.floor(Math.random() * words.length)
    loadProblem (problemNo, cnt);
});

$(document).ready( function() {
    init();
    loadProblem(problemNo, cnt);
});