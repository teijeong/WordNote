var wordNote=[];
var words = [];
var options;
var index;

var problemNo;
var correct, incorrect, total;

function init() {
    wordNote = JSON.parse(localStorage.getItem("wordNote"));
    options = JSON.parse(localStorage.getItem("wordNote.options"));
    index = 0;

    if (options.reverse)
        $.each(wordNote, function(i, word) {
            wordNote[i] = [wordNote[i][1], wordNote[i][0]];
        });
    for (var i = wordNote.length; i >=0; i--) {
        var pick = Math.floor(Math.random() * i);
        wordNote.push(wordNote.splice(pick, 1)[0]);
    }

}

function loadProblem(idx) {
    if( idx >= wordNote.length ) index = wordNote.length - 1;
    if( idx < 0) index = 0;
    $("#word").text(wordNote[idx][0]);
    $("#definition").empty();
    for (var i = 1; i < wordNote[idx].length; i++) {
        $("#definition").append("<li class='list-group-item'>" + wordNote[idx][i] + "</li>");
    }
}

$("body").keyup(function(event) {
    if ( event.keyCode === 37 )
        loadProblem(--index);
    else if ( event.keyCode === 39 )
        loadProblem(++index);
});

$(document).ready( function() {
    $(".prev").click(function() {loadProblem(--index);});
    $(".next").click(function() {loadProblem(++index);});
    init();
    loadProblem(0);
});