var population;
var lifespan = 400; // Each rocket is alive 400 frames
var lifeP; // Made to display count on screen
var count = 0; // Keeps track of frames
var target; // Where rockets are trying to go
var maxforce = 0.2; // Max force applied to rocket

var barriers = [];
var current_b = null;

// Dimensions of barrier
var bar;
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

// Mouse
var mouse;
var epsilon = 30; // distance untill it snaps to nearest point
var snapped = false; // true if mouse is snapped to enarest point


function setup() {
    createCanvas(900, 600);
    population = new Population();
    lifeP = createP();
    target = createVector(width / 2, 50);
    mouse = createVector(mouseX, mouseY);
    bar = new Polygon(10, 30);
    bar.addVertex(100, 200);
    bar.addVertex(100, 250);
    bar.addVertex(10, 30);
    barriers.push(bar);
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

    drawStuff();
}

function drawStuff() {
    // Renders barrier for rockets
    fill(255);
    if (current_b != null) {
        current_b.show();
    }
    rect(rx, ry, rw, rh);
    for (var i = 0; i < barriers.length; i++) {
        print(i);
        barriers[i].show();
    }

    // Renders target
    ellipse(target.x, target.y, 16, 16);
}

function mousePressed() {
    if (current_b == null) {
        current_b = new Polygon(mouse.x, mouse.y);
        active_point = mouse;
    } else {
        current_b.addVertex(mouse);

        if (snapped) {
            current_b.complete();
            barriers.push(current_b);
            current_b = null;
        }
    }
}

function mouseUpdate() {

    mouse = createVector(mouseX, mouseY);
    snapped = false;
    for (var i = 0; i < current_b.vectors.length; i++) {
        //print(poly[i].dist(mouse));
        if (current_b.vectors[i].dist(mouse) < epsilon) {
            mouse = current_b.vectors[i];
            snapped = true;
            //print("Mouse collaped");
            break;
        }
    }
}
