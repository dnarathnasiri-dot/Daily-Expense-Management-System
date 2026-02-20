// Sample Expense Data
const expenses = [
  { amount: 50, category: "Food", date: "2026-02-15" },
  { amount: 30, category: "Transport", date: "2026-02-16" },
  { amount: 70, category: "Food", date: "2026-02-17" },
  { amount: 20, category: "Shopping", date: "2026-02-18" },
  { amount: 100, category: "Bills", date: "2026-02-19" },
];

// Calculations
const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
const avgTransaction = expenses.length ? totalExpenses / expenses.length : 0;
const uniqueCategories = new Set(expenses.map(e => e.category)).size;

// Update UI
document.getElementById("totalExpenses").textContent = "$" + totalExpenses.toFixed(2);
document.getElementById("avgTransaction").textContent = "$" + avgTransaction.toFixed(2);
document.getElementById("totalCategories").textContent = uniqueCategories;

// Last 7 Days Data
const last7Days = [];
const labels = [];
const today = new Date();

for (let i = 6; i >= 0; i--) {
  const d = new Date();
  d.setDate(today.getDate() - i);
  const dateStr = d.toISOString().split("T")[0];
  labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));

  const total = expenses
    .filter(e => e.date === dateStr)
    .reduce((sum, e) => sum + e.amount, 0);

  last7Days.push(total);
}

// Bar Chart
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: "Amount",
      data: last7Days,
      backgroundColor: "#3B82F6"
    }]
  }
});

// Category Data
const categoryTotals = {};
expenses.forEach(e => {
  categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
});

// Pie Chart
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]
    }]
  }
});

// Monthly Breakdown
const monthName = today.toLocaleString("default", { month: "short", year: "numeric" });
document.getElementById("monthName").textContent = monthName;
document.getElementById("monthTotal").textContent = "$" + totalExpenses.toFixed(2);