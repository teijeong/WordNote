Array.prototype.shuffle = function() {
    var size = this.length;
    for (var i = 0; i < size; i++) {
        var j = Math.floor(Math.random() * size);
        if (i !== j) {
            var tmp = this[i];
            this[i] = this[j];
            this[j] = tmp;
        }
    }
};
