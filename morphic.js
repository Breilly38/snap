/*

    morphic.js
    this.isPassword = false;

StringMorph.prototype.password = function (letter, length) {
    var ans = '',
        i;
    for (i = 0; i < length; i += 1) {
        ans += letter;
    }
    return ans;
};

        txt = this.isPassword ?
                this.password('*', this.text.length) : this.text;
                this.password('*', this.text.length) : this.text,
        dest = Math.min(Math.max(slot, 0), txt.length),
                this.password('*', this.text.length) : this.text,
        idx = 0,
        charX = 0,
        menu.addItem("show characters", 'toggleIsPassword');
    } else {
        menu.addItem("hide characters", 'toggleIsPassword');
    }
    return menu;

StringMorph.prototype.toggleIsPassword = function () {
    this.isPassword = !this.isPassword;
    this.changed();
    this.drawNew();
    this.changed();
};

    var cursor = this.root().cursor;
        if (cursor) {
        }