function Population() {

    // Array of rockets
    this.rockets = [];
    // Amount of rockets
    this.popsize = 200;
    // Amount parent rocket partners
    this.matingpool = [];

    // Associates a rocket to an array index
    for (var i = 0; i < this.popsize; i++)
        this.rockets[i] = new Rocket();


    this.evaluate = function () {

        var maxfit = 0;
        var target_hitters = 0;
        // Iterate through all rockets and calcultes their fitness
        for (var i = 0; i < this.popsize; i++) {
            // Calculates fitness
            this.rockets[i].calcFitness();
            // Get the max fitness achieved
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
            // Count how many rockets hit the target
            if (this.rockets[i].completed) {
                target_hitters++;
            }
        }

        // Normalises fitnesses
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }

        this.matingpool = [];
        // Take rockets fitness make in to scale of 1 to 100
        // Rockets with higher fitness will have more success in the mating pool
        for (var i = 0; i < this.popsize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
        return target_hitters;
    }
    
    // Selects appropriate genes for child
    this.selection = function () {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            // Picks random dna
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            // Creates child dna by using crossover function
            var child = parentA.crossover(parentB);
            child.mutation();
            // Creates new rocket with child dna
            newRockets[i] = new Rocket(child);
        }
        // This instance of rockets are the new rockets
        this.rockets = newRockets;
    }

    // Update rockets and show them
    this.run = function () {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            // Displays rockets to screen
            this.rockets[i].show();
        }
    }
}