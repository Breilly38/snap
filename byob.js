/*

CustomBlockDefinition.prototype.helpSpec = function () {
    var ans = [],
        parts = this.parseSpec(this.spec);
    parts.forEach(function (part) {
        if (part[0] !== '%') {
            ans.push(part);
        }
    });
    return ''.concat.apply('', ans).replace(/\?/g, '');
};

    element.setCategory(this.category);
    button = new ToggleMorph(