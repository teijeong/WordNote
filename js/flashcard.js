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
    if (options.shuffle) wordNote.shuffle();
}

function loadProblem(idx) {
    if( idx >= wordNote.length ) index = wordNote.length - 1;
    if( idx < 0) index = 0;
    $("#word").text(wordNote[idx][0]);
    $("#definition").empty();
    flipped = options.flip;
    flipCard();
}

var flipped;
function flipCard() {
    if (flipped)
        $("#definition").empty();
    else
        for (var i = 1; i < wordNote[index].length; i++) {
            $("#definition").append("<li class='list-group-item'>" + wordNote[index][i] + "</li>");
        }
    flipped = !flipped;
}

$("body").keyup(function(event) {
    switch ( event.keyCode){
        case 37: // Left
            loadProblem(--index);
            break;
        case 39: // Right
            loadProblem(++index);
            break;
        case 32: // Space
        case 38: // Up
        case 40: // Down
            flipCard();
            break;
    }
});

$(document).ready( function() {
    $(".prev").click(function() {loadProblem(--index);});
    $(".next").click(function() {loadProblem(++index);});
    init();
    loadProblem(0);
});
