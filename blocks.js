/*
        spec = this.selector === 'evaluateCustomBlock' ?
                this.definition.helpSpec() : this.selector,

BlockMorph.prototype.stackHeight = function () {
    var fb = this.fullBounds(),
        commentsBottom = Math.max(this.allComments().map(
            function (comment) {return comment.bottom(); }
        ));
    return Math.max(fb.bottom(), commentsBottom) - fb.top();
};

    if (target instanceof MultiArgMorph) {
        this.feedbackMorph.color =
            SpriteMorph.prototype.blockColor.lists.copy();
        this.feedbackMorph.borderColor =
            SpriteMorph.prototype.blockColor.lists;
    } else {
    }
    this.feedbackMorph.drawNew();
        myself = this;
        if (child instanceof CommentMorph && child.block) {
            return; // skip anchored comments
        }
        child.setPosition(origin.add(new Point(myself.cleanUpMargin, y)));
            child.allComments().forEach(function (comment) {
                comment.align(child, true); // ignore layer
            });
        }
        y += child.stackHeight() + myself.cleanUpSpacing;
    });
        if (!ignoreLayer) {
        }

CommentMorph.prototype.stackHeight = function () {
    return this.height();
};
