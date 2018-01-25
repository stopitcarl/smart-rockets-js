var population;
var lifespan = 400; // Each rocket is alive 400 frames
var lifeP; // Made to display count on screen
var count = 0; // Keeps track of frames
var target; // Where rockets are trying to go
var maxforce = 0.2; // Max force applied to rocket

var barriers = [];
var current_b;

// barriers and environment
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

// Mouse
var mouse;
var active_point = null;
var epsilon = 30; // distance untill it snaps to nearest point
var snapped = false; // true if mouse is snapped to enarest point


function setup() {
    createCanvas(900, 600);
    population = new Population();
    lifeP = createP();
    target = createVector(width / 2, 50);
    mouse = createVector(mouseX, mouseY);
    current_b = new Polygon();
}


function draw() {
    background(0);
    population.run();
    // Displays count to window
    lifeP.html(count);

    count++;
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        // Population = new Population();
        count = 0;
    }
    mouseUpdate();
    drawStuff();
}


function drawStuff() {
    // Render mouse
    strokeWeight(5);
    stroke(0, 50, 240);
    ellipse(mouse.x, mouse.y, 50);

    // Render constructing lines
    if (active_point != null) {
        line(active_point.x, active_point.y, mouse.x, mouse.y);
    }


    // Renders barrier for rockets
    fill(255);
    current_b.show();
    rect(rx, ry, rw, rh);

    for (var i = 0; i < barriers.length; i++) {
        barriers[i].show();
    }

    // Renders target
    ellipse(target.x, target.y, 16, 16);
}


function mousePressed() {

    current_b.addVertex(mouse);
    active_point = mouse;

    if (snapped) {
        current_b.complete();
        barriers.push(current_b);
        current_b = new Polygon();
        active_point = null;
    }
}


function mouseUpdate() {

    mouse = createVector(mouseX, mouseY);
    snapped = false;
    for (var i = 0; i < current_b.vectors.length; i++) {
        if (current_b.vectors[i].dist(mouse) < epsilon) {
            mouse = current_b.vectors[i];
            snapped = true;
            break;
        }
    }

}
