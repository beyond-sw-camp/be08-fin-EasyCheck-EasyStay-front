<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const chartId = "theme-chart";
const title = ref("각 테마파크별 매출 현황");
const chartInstance = ref(null);

const themeChartData = ref({
  labels: ["Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "설악 워터피아",
      data: [120, 120, 130],
    },
    {
      label: "플라자CC설악",
      data: [110, 160, 100],
    },
    {
      label: "워터파크",
      data: [100, 140, 150],
    },
  ],
});

onMounted(() => {
  const ctx = document.getElementById(chartId).getContext("2d");

  // 그라데이션 정의 - 더 연한 투명도로 수정
  const gradients = {
    waterpia: ctx.createLinearGradient(0, 230, 0, 50),
    plaza: ctx.createLinearGradient(0, 230, 0, 50),
    waterpark: ctx.createLinearGradient(0, 230, 0, 50),
  };

  // 투명도를 0.2 -> 0.1로 줄이고, 중간 단계 제거
  gradients.waterpia.addColorStop(1, "rgba(255, 182, 193, 0.1)");
  gradients.waterpia.addColorStop(0, "rgba(255, 182, 193, 0.0)");

  gradients.plaza.addColorStop(1, "rgba(135, 206, 235, 0.1)");
  gradients.plaza.addColorStop(0, "rgba(135, 206, 235, 0.0)");

  gradients.waterpark.addColorStop(1, "rgba(207, 207, 251, 0.1)");
  gradients.waterpark.addColorStop(0, "rgba(207, 207, 251, 0.0)");

  // 기존 차트 제거
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: themeChartData.value.labels,
      datasets: [
        {
          label: "설악 워터피아",
          data: themeChartData.value.datasets[0].data,
          borderColor: "#FFB6C1",
          backgroundColor: gradients.waterpia,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "플라자CC설악",
          data: themeChartData.value.datasets[1].data,
          borderColor: "#87ceeb",
          backgroundColor: gradients.plaza,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "워터파크",
          data: themeChartData.value.datasets[2].data,
          borderColor: "#cfcffb",
          backgroundColor: gradients.waterpark,
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
              return value + "명";
            },
          },
          title: {
            display: true,
            text: "방문객 수",
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
