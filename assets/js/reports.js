/* ===============================
   FULL REPORT PAGE JAVASCRIPT
   =============================== */

/* Demo Data */
const expenses = [
  { date: 'Feb 10', amount: 200, category: 'Food' },
  { date: 'Feb 11', amount: 30, category: 'Shopping' },
  { date: 'Feb 12', amount: 55, category: 'Utilities' },
  { date: 'Feb 13', amount: 0, category: 'Food' },
  { date: 'Feb 14', amount: 15, category: 'Transport' },
  { date: 'Feb 15', amount: 120, category: 'Food' },
  { date: 'Feb 16', amount: 160, category: 'Utilities' }
];

/* Calculations */
const total = expenses.reduce((sum, e) => sum + e.amount, 0);
const avg = total / expenses.length;

const categories = {};
expenses.forEach(e => {
  categories[e.category] = (categories[e.category] || 0) + e.amount;
});

/* Update Stats */
document.getElementById('totalExpenses').textContent = `$${total.toFixed(2)}`;
document.getElementById('avgTransaction').textContent = `$${avg.toFixed(2)}`;
document.getElementById('totalCategories').textContent =
  Object.keys(categories).length;

document.getElementById('monthName').textContent = 'Feb 2026';
document.getElementById('monthTotal').textContent = `$${total.toFixed(2)}`;

/* Bar Chart */
new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: {
    labels: expenses.map(e => e.date),
    datasets: [{
      data: expenses.map(e => e.amount),
      backgroundColor: '#4f7cff',
      borderRadius: 6
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

/* Donut Chart */
new Chart(document.getElementById('donutChart'), {
  type: 'doughnut',
  data: {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: [
        '#7ED3D1',
        '#FF8AA1',
        '#FFD36E',
        '#6CA8FF',
        '#B39DDB'
      ],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '65%',
    plugins: { legend: { display: false } }
  }
});