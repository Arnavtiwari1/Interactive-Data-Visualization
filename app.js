// Sample data for the bar chart
const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Monthly Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56],
    }],
};

// Chart configuration
const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Monthly Sales Data',
                font: {
                    size: 20,
                },
                color: '#333',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Sales: ${context.parsed.y}`;
                    },
                },
            },
            legend: {
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeOutBounce',
        },
    },
};

// Create the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, config);

// Apply smooth animations using Anime.js
anime({
    targets: '.chart-container',
    opacity: [0, 1],
    easing: 'easeInOutQuad',
    duration: 1000,
    delay: 500,
});

document.getElementById('updateData').addEventListener('click', () => {
    // Generate new random data for demonstration
    const newData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    myChart.data.datasets[0].data = newData;
    myChart.update();
});

const animateData = () => {
    anime({
        targets: myChart.data.datasets[0].data,
        easing: 'easeInOutQuad',
        duration: 1500,
        update: function () {
            myChart.update();
        },
        complete: function () {
            anime({
                targets: myChart.data.datasets[0].data,
                easing: 'easeInOutQuad',
                duration: 1500,
                loop: true,
                direction: 'alternate',
                update: function () {
                    myChart.update();
                },
            });
        }
    });
};