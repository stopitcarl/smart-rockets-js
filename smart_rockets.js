var population;
var lifespan = 400; // Each rocket is alive 400 frames
var lifeP; // Made to display count on screen
var count = 0; // Keeps track of frames

var maxforce = 0.2; // Max force applied to rocket

var barriers = [];
var current_b;

// dna
mutation_prob = 0.01;


// target
var target; // Where rockets are trying to go
var target_diameter = 10;
var target_color;


// Mouse
var mouse;
var mouse_diameter = 10;
var mouse_color;
var active_point = null;
var epsilon = 18; // distance untill it snaps to nearest point
var snapped = false; // true if mouse is snapped to enarest point


function setup() {
    createCanvas(900, 600);
    rectMode(CENTER);

    population = new Population();
    lifeP = createP();
    target = createVector(width / 2, 50);
    target_color = color(240, 28, 60);
    current_b = new Polygon();
    mouse = createVector(mouseX, mouseY);
    mouse_color = color(100, 78, 200);

}


function draw() {
    background(0);

    // Displays count to window
    lifeP.html(count);
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        // Population = new Population(); <-- deprecated way of starting new population
        count = 0;
    }
    mouseUpdate();


    drawMap();
    population.run();
    count++;
}


function drawMap() {
    // Render mouse
    strokeWeight(5);
    stroke(0, 50, 240);
    ellipse(mouse.x, mouse.y, 10);

    // Render constructing lines
    if (active_point != null) {
        line(active_point.x, active_point.y, mouse.x, mouse.y);
    }

    // Render barriers
    fill(255);
    current_b.show();
    for (var i = 0; i < barriers.length; i++) {
        barriers[i].show();
    }

    // Renders target
    ellipse(target.x, target.y, target_diameter);
}


function mousePressed() {
    if (mouseButton == RIGHT) {
        if (active_point != null) {
            current_b = new Polygon(); // restart the current barrier
            active_point = null;

        } else {
            barriers.pop() // delete most recent barrier
        }
        return;
    }

    current_b.addVertex(mouse);
    active_point = mouse;

    if (snapped) {
        current_b.complete();
        barriers.push(current_b);
        current_b = new Polygon();
        active_point = null;
    }
}

// Enables mouse snap-in to nearest point
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
