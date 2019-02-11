// Setup chart
chart = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: target_axis, // defined in main.js
        datasets: [{
            data: target_reachers, // defined in main.js
            label: "number of rockets who hit target",
            borderColor: "#3e95cd",
            fill: false
        }, {
            data: barrier_counter, // defined in main.js
            label: "number of barriers",
            borderColor: "#ff7f50",
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});