const athensData = {
    "monthlyAvg": [
        { "high": 12, "low": 7 },
        { "high": 12, "low": 7 },
        { "high": 14, "low": 8 },
        { "high": 18, "low": 11 },
        { "high": 22, "low": 15 },
        { "high": 26, "low": 19 },
        { "high": 28, "low": 22 },
        { "high": 28, "low": 22 },
        { "high": 25, "low": 19 },
        { "high": 21, "low": 15 },
        { "high": 17, "low": 11 },
        { "high": 13, "low": 8 }
    ]
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const tableBody = document.getElementById('data-table-body');

athensData.monthlyAvg.forEach((monthData, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${months[index]}</td>
        <td>${monthData.high}</td>
        <td>${monthData.low}</td>
    `;
    tableBody.appendChild(row);
});

const highTemps = athensData.monthlyAvg.map(month => month.high);
const lowTemps = athensData.monthlyAvg.map(month => month.low);

const ctx = document.getElementById('athensChart').getContext('2d');
const athensChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,

        datasets: [
            {
                label: 'Average High Temperature (°C)',
                data: highTemps,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            },
            {
                label: 'Average Low Temperature (°C)',
                data: lowTemps,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Months'
                }
            }
        },
    }
});