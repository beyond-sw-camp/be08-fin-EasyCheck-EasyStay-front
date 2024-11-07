<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const chartId = "room-chart";
const title = ref("각 객실별 매출 현황");
const chartInstance = ref(null);

const roomChartData = ref({
  labels: ["Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "디럭스",
      data: [150, 200, 150],
    },
    {
      label: "스위트",
      data: [180, 160, 200],
    },
    {
      label: "로얄",
      data: [200, 140, 130],
    },
    {
      label: "플래티넘",
      data: [120, 180, 170],
    },
  ],
});

onMounted(() => {
  const ctx = document.getElementById(chartId).getContext("2d");

  // 그라데이션 정의 - 더 연한 투명도로 수정
  const gradients = {
    deluxe: ctx.createLinearGradient(0, 230, 0, 50),
    suite: ctx.createLinearGradient(0, 230, 0, 50),
    royal: ctx.createLinearGradient(0, 230, 0, 50),
    platinum: ctx.createLinearGradient(0, 230, 0, 50),
  };

  // 투명도를 0.2 -> 0.1로 줄이고, 중간 단계 제거
  gradients.deluxe.addColorStop(1, "rgba(255, 99, 132, 0.1)");
  gradients.deluxe.addColorStop(0, "rgba(255, 99, 132, 0.0)");

  gradients.suite.addColorStop(1, "rgba(54, 162, 235, 0.1)");
  gradients.suite.addColorStop(0, "rgba(54, 162, 235, 0.0)");

  gradients.royal.addColorStop(1, "rgba(75, 192, 192, 0.1)");
  gradients.royal.addColorStop(0, "rgba(75, 192, 192, 0.0)");

  gradients.platinum.addColorStop(1, "rgba(255, 159, 64, 0.1)");
  gradients.platinum.addColorStop(0, "rgba(255, 159, 64, 0.0)");

  // 기존 차트 제거
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: roomChartData.value.labels,
      datasets: [
        {
          label: "디럭스",
          data: roomChartData.value.datasets[0].data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: gradients.deluxe,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "스위트",
          data: roomChartData.value.datasets[1].data,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: gradients.suite,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "로얄",
          data: roomChartData.value.datasets[2].data,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: gradients.royal,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "플래티넘",
          data: roomChartData.value.datasets[3].data,
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: gradients.platinum,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            padding: 10,
            color: "#ccc",
            font: {
              size: 11,
            },
            callback: function (value) {
              return value + "건";
            },
          },
          title: {
            display: true,
            text: "예약 건수",
            color: "#ccc",
            font: {
              size: 12,
              weight: "normal",
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: true,
            color: "#ccc",
            padding: 10,
            font: {
              size: 11,
            },
          },
          title: {
            display: true,
            text: "월별",
            color: "#ccc",
            font: {
              size: 12,
              weight: "normal",
            },
          },
        },
      },
    },
  });
});
</script>

<template>
  <div class="card z-index-2">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas :id="chartId" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-canvas {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-header h6 {
  color: #344767;
  font-size: 1rem;
  margin: 0;
}
</style>
