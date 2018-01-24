function Polygon(x, y) {
    this.vectors = [];
    this.finished = false;
    this.c = color(85, 245, 120);


    this.addVertex = function(x, y) {
        this.vectors.push(createVector(x, y));
    }
    this.addVertex(x, y);

    this.complete = function() {
        this.finished = true;
    }

    this.show = function() {

        if (this.finished) {

            fill(this.c);
            noStroke();
        } else {

            noFill();
            strokeWeight(3);
            stroke(this.c);
            for (p in this.vectors) {
                ellipse(p.x, p.y, 20);
            }
        }
        beginShape();
        for (var i = 0; i < this.vectors.length; i++) {

            vertex(this.vectors[i].x, this.vectors[i].y);
        }
        endShape();
    }
}
