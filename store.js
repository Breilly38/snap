/*

ArgLabelMorph.prototype.toXML = function (serializer) {
    return serializer.format(
        '%',
        serializer.store(this.inputs()[0])
    );
};

    if (this.isContinuation) { // continuations are transient in Snap!
        return '';
    }