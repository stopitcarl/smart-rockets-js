function Mouse() {

    this.pos = createVector(mouseX, mouseY); // mouse position vector    
    this.mouse_diameter = 10; // size of mouse on screen
    this.mouse_color = color(100, 78, 200); // color of mouse
    this.snapped = false; // true if mouse is snapped to a barrier's vertex

    this.update = function () {
        // Update position vector
        this.pos = createVector(mouseX, mouseY);
        this.snapped = false;

        // Check all points of barrier being drawn (if there's any)
        for (var i = 0; i < current_b.vertices.length; i++) {
            // If mouse is closer than 'epsilon', snap it to point            
            if (mouse.pos.dist(current_b.vertices[i]) < epsilon) {
                mouse.pos = current_b.vertices[i];
                this.snapped = true;
                break;
            }
        }

        // Draw mouse (a circle)
        strokeWeight(5);
        fill(this.mouse_color);
        stroke(this.mouse_color);
        ellipse(this.pos.x, this.pos.y, this.mouse_diameter);
    }
}