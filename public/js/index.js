const stockList = document.querySelector('#stockList');
const ctx = document.querySelector('#stockChart').getContext('2d');
let chart;

const eventSource = new EventSource('http://localhost:3068/stocks/stream', { withCredentials: true });

eventSource.addEventListener('stockUpdate', (e) => {
  const data = JSON.parse(e.data);
  updateStockList(data);
  updateChart(data);
});

const updateStockList = (data) => {
  stockList.innerHTML = '';
  Object.values(data).forEach((stock) => {
    const card = document.createElement('div');
    card.className = 'stock-card';
    card.innerHTML = `
              <div class="stock-name">${stock.name} (${stock.symbol})</div>
              <div class="stock-price">${stock.price}원</div>
              <div class="stock-change ${parseFloat(stock.change) >= 0 ? 'positive' : 'negative'}">
                  ${stock.change}원 (${stock.changeRate}%)
              </div>
          `;
    stockList.appendChild(card);
  });
};

const updateChart = (data) => {
  const labels = Object.values(data).map((stock) => stock.name);
  const prices = Object.values(data).map((stock) => parseFloat(stock.price.replace(',', '')));

  if (!chart) {
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: '주식 가격',
            data: prices,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true, scales: { y: { beginAtZero: false } } },
    });
  } else {
    chart.data.labels = labels;
    chart.data.datasets[0].data = prices;
    chart.update();
  }
};
