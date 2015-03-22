var wordNote=[];
var words = [];
var options;
var index;

var server = "http://ec2-54-65-235-228.ap-northeast-1.compute.amazonaws.com:5001/";

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

var sounds = {};
var req;
function loadProblem(idx) {
    if( idx >= wordNote.length ) index = wordNote.length - 1;
    if( idx < 0) index = 0;
    var word = wordNote[idx][0];
    $("#word").text(word);
    word = word.toLowerCase();



    if (sounds[word]) {
        var sound = new Howl({
            urls:[sounds[word]]
        }).play();
    } else {
        $.ajax({
            url: server + "sound/" + word,
            crossDomain: true,
            type: 'GET',
            success: function(data) {
                var url = "http://media.merriam-webster.com/soundc11/" + data.sound;
                sounds[word] = url;
                var sound = new Howl({
                    urls:[url]
                }).play();
            }
        });
    }

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
    $(".flip").click(flipCard);
    init();
    loadProblem(0);
});
