function Rocket(dna) {
    // Physics of rocket at current instance
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.width = 5;
    this.height = 25;
    this.color = color(150, 154);


    this.completed = false; // checks if rocket reached target
    this.crashed = false; // checks if rocket crashed into anything
    this.stuck = false; // check if rocket crashed into user-made barriers

    // Give rocket DNA object
    if (dna) { // check if 'dna' argument exists
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    // rocket can receive force and add to acceleration
    this.applyForce = function(force) {
        this.acc.add(force);
    }
    // Calulates fitness of rocket
    this.calcFitness = function() {
        // Takes distance to target
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);

        // Maps range of fitness
        this.fitness = map(d, 0, width, width, 0);
        // If rocket gets to target increase fitness of rocket
        if (this.completed) {
            this.fitness *= map(this.bonus, 0, lifespan, 0, 10) + 4;
        }
        // If rocket does not get to target decrease fitness
        if (this.stuck) {
            this.fitness /= 10;
        }
    }
    // Updates state of rocket
    this.update = function() {
		
        // Checks distance from rocket to target
        var d = this.pos.dist(target);

        // If distance less than target diameter, then it has reached target
        if (d < target_diameter) {
            this.completed = true;
            this.pos = target.copy();
            this.bonus = lifespan - count;

            // Rocket has hit left or right of window
        } else if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;

            // Rocket has hit top or bottom of window
        } else if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;

            // Rocket has hit user made barrier
        } else {
            for (var i = 0; i < barriers.length; i++) {
                if (collideRectPoly(this.pos.x, this.pos.y, this.width, this.height, barriers[i].vectors)) {
                    this.crashed = this.stuck = true;
                    break;
                }
            }
        }


        // applies the vector defined in dna to rocket
        this.applyForce(this.dna.genes[count]);

        // if rocket has not got to goal and not crashed then update physics engine
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }
    // displays rocket to canvas
    this.show = function() {
        // push and pop allows rotating and translation not to affect other objects
        push();
        // color customization of rockets
        noStroke();
        fill(this.color);
        // translate to the postion of rocket
        translate(this.pos.x, this.pos.y);
        // rotate to the angle the rocket is pointing
        rotate(this.vel.heading());
        // draw rectangle shape for rocket
        rect(0, 0, this.height, this.width);
        pop();
    }
}
