// assets/js/dashboard.js
// ── Dashboard: stat cards + pie chart + recent transactions ──────

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#84cc16','#6b7280'];
let pieChart = null;

async function loadDashboard() {
  const res = await API.getSummary();
  if (!res.success) {
    console.error('Summary failed:', res.message); return;
  }
  const d = res.data;

  // Stat cards
  document.getElementById('todayTotal').textContent = fmt$(d.today_total);
  document.getElementById('monthTotal').textContent = fmt$(d.month_total);
  document.getElementById('totalTx').textContent    = d.total_transactions;
  document.getElementById('avgExpense').textContent = fmt$(d.average_expense);

  // Charts
  buildPie(d.categories);

  // Recent transactions
  const rec = await API.getRecent(5);
  buildRecent(rec.data || []);
}

// ── Pie chart ────────────────────────────────────────────────────
function buildPie(cats) {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  if (pieChart) pieChart.destroy();

  if (!cats || !cats.length) {
    ctx.closest('.chart-wrap').innerHTML =
      '<p class="text-muted text-center pt-5">No category data yet.</p>';
    return;
  }

  const total  = cats.reduce((s, c) => s + parseFloat(c.total), 0);
  const labels = cats.map(c => `${c.name} ${total > 0 ? Math.round(c.total / total * 100) : 0}%`);
  const vals   = cats.map(c => parseFloat(c.total));
  const colors = cats.map((c, i) => c.color || COLORS[i % COLORS.length]);

  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: vals,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { font: { size: 12 }, padding: 14, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${fmt$(ctx.raw)}` }
        }
      }
    }
  });
}

// ── Recent transactions list ─────────────────────────────────────
function buildRecent(list) {
  const wrap = document.getElementById('recentList');
  if (!list.length) {
    wrap.innerHTML = '<p class="text-muted text-center py-5">No expenses yet. <a href="add-expense.html">Add one!</a></p>';
    return;
  }

  wrap.innerHTML = list.map(e => `
    <div class="tx-row">
      <div>
        <div class="tx-name">${esc(e.description || 'No description')}</div>
        <div class="tx-meta">
          <span class="cat-badge" style="background:${e.category_color}22;color:${e.category_color};">
            ${esc(e.category_name)}
          </span>
          &nbsp;•&nbsp;${fmtDate(e.date)}
        </div>
      </div>
      <div class="tx-amount">-${fmt$(e.amount)}</div>
    </div>
  `).join('');
}

// Boot
loadDashboard();
