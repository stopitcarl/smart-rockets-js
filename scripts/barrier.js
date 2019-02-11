function Barrier() {

    this.vertices = []; // List of vertices
    this.finished = false; // Checks if barrier is completed
    this.c = color(85, 245, 120);

    // Add vertex to barrier
    this.addVertex = function (vect) {
        this.vertices.push(vect);
    }

    // Set flag as barrier completed
    this.complete = function () {
        this.finished = true;
    }

    this.show = function () {
        // Set barrier to 'fill' if it's completed
        if (this.finished) {
            fill(this.c);           
        } else { // Otherwise only draw its borders 
            noFill();
            strokeWeight(3);
            stroke(this.c);            
        }
        // Start polygon
        beginShape();
        for (var i = 0; i < this.vertices.length; i++) {
            // Draw vertex
            vertex(this.vertices[i].x, this.vertices[i].y);
        }
        endShape(); // End polygon
    }
}