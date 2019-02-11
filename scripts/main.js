// population
var population;
var lifespan = 400; // Each rocket is alive 400 frames
var count = 0; // Keeps track of frames

// rocket
var maxforce = 0.2; // Max force applied to rocket

// barriers
var barriers = []; // List of user-made barriers
var current_b; // Temporary barrier being built by user (when complete,it's pushed to 'barriers')

// dna
mutation_prob = 0.01;

// target
var target; // Where rockets are trying to go
var target_diameter = 10;
var target_color;

// life bar
var bar_color;
var bar_height = 5;

// mouse
var mouse;
var active_point;
var epsilon = 18; // distance untill it snaps to nearest point

// data
var chart;
var chart_height = 0.2; // percentage of screen chart will take
var target_reachers = [];
var barrier_counter = [];
var target_axis = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function setup() {
    // Setup drawing canvas
    var canvas = createCanvas(windowWidth, windowHeight - (chart_height * windowHeight));
    canvas.parent('sketch-holder');
    rectMode(CENTER);
    frameRate(60);

    population = new Population();
    target = createVector(width - 50, height / 2);
    target_color = color(140, 128, 60);
    current_b = new Barrier();
    bar_color = color(40, 128, 78)
    mouse = createVector(mouseX, mouseY);
}


function draw() {
    background(0);
    mouse = new Mouse();
    // Displays count to window
    displayLifeBar(count);

    // Check if lifespan has completed
    if (count == lifespan) {
        // Evaluate fitness
        var target_hitters = population.evaluate();
        // Create new population
        population.selection();
        // Reset counter
        count = 0;
        //Update chart
        updateData(target_hitters);
    } else {
        drawMap();
        population.run();
    }

    // Check mouse coordinates
    mouse.update();

    count++;
}

function displayLifeBar(count) {
    fill(bar_color);
    strokeWeight(0);
    rect(0, bar_height, (width / lifespan) * count * 2, bar_height);
}


function drawMap() {
    // Render constructing lines    
    if (active_point != null) {
        fill(bar_color);
        stroke(bar_color);
        strokeWeight(4);
        line(active_point.x, active_point.y, mouse.pos.x, mouse.pos.y);
    }

    // Render barriers
    fill(255);
    current_b.show();
    for (var i = 0; i < barriers.length; i++) {
        barriers[i].show();
    }

    // Render target
    fill(target_color);
    stroke(target_color);
    ellipse(target.x, target.y, target_diameter);
}


function updateData(count) {
    // Increase x axis if needed
    if (target_axis.length < target_reachers.length)
        target_axis.push(target_axis[target_axis.length - 1] + 1)
    // Number of rockets that reached target
    target_reachers.push(count);
    // Number of barriers
    barrier_counter.push(barriers.length);
    // Update chart
    chart.update();
}

// ############## Event listeners (p5js) #########################

function mousePressed() {
    if (mouseButton == RIGHT) {
        // If there is a barrier being built, restart it
        if (active_point != null) {
            current_b = new Barrier(); // restart the current barrier
            active_point = null;
        } else { // If no barrier being built, erase last built barrier
            barriers.pop()
        }
        return;
    }

    current_b.addVertex(mouse.pos);
    active_point = mouse.pos;

    // If mouse has snapped onto vertex, turn polygon to barrier
    if (mouse.snapped) {
        // End polygon
        current_b.complete();
        // Add polygon to barrier list
        barriers.push(current_b);
        // Start new barrier (with no active points)
        current_b = new Barrier();
        // Reset active building point
        active_point = null;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}