var wordNote = [];

function handleFileselect (event) {
    event.stopPropagation();
    event.preventDefault();

    readFile(event.originalEvent.dataTransfer.files);
}

function handleFileselect2 (event) {
    event.stopPropagation();
    event.preventDefault();

    readFile(event.target.files);    
}

function readFile(files) {
    var output = [];
    $.each(files, function(i, f) {

        var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                var text = e.target.result.replace(/\r/g,"").split("\n");
                var str = "";
                wordNote = [];
                for (var i = 1; i < text.length; i += 2) {
                    str += text[i-1] + ": " + text[i] + "\n";
                    var word = {
                        word: text[i-1],
                        meaning: text[i].split(";").map($.trim)
                    };
                    wordNote.push(word);
                }
                $("#list").val(str);
                localStorage.setItem("wordNote", JSON.stringify(wordNote));
            };
        })(f);
        reader.readAsText(f);
    });
}

function generateOptions() {
    var options = {};
    if ($("#reverse").prop("checked")) options.reverse = true;
    else options.reverse = false;
    if ($("#shuffle").prop("checked")) options.shuffle = true;
    else options.shuffle = false;
    if ($("#flip").prop("checked")) options.flip = false;
    else options.flip = true;
    if ($("#tts").prop("checked")) options.tts = true;
    else options.tts = false;
    options.count = $("#option-count").val();
    if ($("#autoplay").val() !== "0")
        options.autoplay = Number($("#autoplay").val());
    return options;
}


function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.originalEvent.dataTransfer.dropEffect = 'copy';
}


$(document).ready(function() {
    $("#drop-zone").on("dragover", handleDragOver);
    $("#drop-zone").on("drop",  handleFileselect);
    $("#inputfile").on("change", handleFileselect2)
    $("#list").on("dragover", handleDragOver);
    $("#list").on("drop",  handleFileselect);
    $("button").click(function() {
        localStorage.setItem("wordNote.options", JSON.stringify(generateOptions()));
    });
});