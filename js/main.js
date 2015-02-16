var wordNote = [];

function handleFileselect (event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.originalEvent.dataTransfer.files;

    var output = [];
    $.each(files, function(i, f) {

        var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                var text = e.target.result.split("\n");
                var str = "";
                wordNote = [];
                for (var i = 0; i < text.length; i += 2) {
                    str += text[i] + ": " + text[i + 1] + "\n";
                    wordNote.push([text[i]].concat(text[i+1].split(";").map(String.trim)));
                }
                $("#list").val(str);
                localStorage.setItem("wordNote", JSON.stringify(wordNote));
            };
        })(f);
        reader.readAsText(f);
    });
}

function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.originalEvent.dataTransfer.dropEffect = 'copy';
}


$(document).ready(function() {
    $("#drop-zone").on("dragover", handleDragOver);
    $("#drop-zone").on("drop",  handleFileselect);
});