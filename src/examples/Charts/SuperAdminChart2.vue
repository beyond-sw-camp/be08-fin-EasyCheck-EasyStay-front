<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const chartId = "theme-bar-chart";
const title = ref("테마파크별 매출 현황");
const chartInstance = ref(null);

const chartLine2Data = ref({
  labels: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
  ],
  datasets: [
    {
      label: "설악 워터피아",
      data: [4800, 2200, 3500, 5200, 3800, 2800, 4200, 3200, 4500, 9800, 4800],
    },
    {
      label: "플라자CC 설악",
      data: [2200, 2000, 2800, 3200, 3800, 3500, 4200, 5200, 3800, 3200, 2800],
    },
    {
      label: "인피니티풀",
      data: [3500, 3200, 3800, 4200, 4800, 4500, 5200, 6200, 4800, 4200, 3800],
    },
    {
      label: "마리나",
      data: [5200, 4800, 5500, 6200, 7200, 6800, 7800, 8800, 7200, 6500, 5800],
    },
    {
      label: "산정 에코 물놀이장",
      data: [3800, 3500, 4200, 4800, 5500, 5200, 6200, 7500, 5800, 5200, 4800],
    },
    {
      label: "유니버셜 스튜디오",
      data: [2800, 2500, 3200, 3800, 4500, 4200, 5200, 6200, 4800, 4200, 3800],
    },
    {
      label: "스플라스 워터파크",
      data: [4200, 3800, 4500, 5200, 6000, 5800, 6800, 7800, 6200, 5500, 5200],
    },
    {
      label: "라라골프클럽",
      data: [3200, 3000, 3500, 4200, 4800, 4500, 5200, 6200, 4800, 4200, 3800],
    },
    {
      label: "디즈니랜드",
      data: [4500, 4200, 4800, 5500, 6200, 5800, 6800, 7800, 6200, 5500, 5200],
    },
    {
      label: "온천 사우나",
      data: [
        9800, 9200, 10500, 11200, 12500, 11800, 13500, 15200, 12800, 11500,
        10800,
      ],
    },
  ],
});

onMounted(() => {
  const ctx = document.getElementById(chartId).getContext("2d");

  // 컬러 팔레트 정의
  const colors = {
    borders: [
      "#FFB6C1",
      "#87ceeb",
      "#cfcffb",
      "#82cbc4",
      "#58ccff",
      "#0e6ca5",
      "#9fa9d8",
      "#b96bc6",
      "#fb7a09",
      "#000000",
    ],
    backgrounds: [
      "rgba(255, 182, 193, 0.1)",
      "rgba(135, 206, 235, 0.1)",
      "rgba(207, 207, 251, 0.1)",
      "rgba(130, 203, 196, 0.1)",
      "rgba(88, 204, 255, 0.1)",
      "rgba(14, 108, 165, 0.1)",
      "rgba(159, 169, 216, 0.1)",
      "rgba(185, 107, 198, 0.1)",
      "rgba(251, 122, 9, 0.1)",
      "rgba(0, 0, 0, 0.1)",
    ],
  };

  // 기존 차트 제거
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLine2Data.value.labels,
      datasets: chartLine2Data.value.datasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: colors.borders[index],
        backgroundColor: colors.backgrounds[index],
        borderWidth: 2,
        borderRadius: 5,
        maxBarThickness: 10,
      })),
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
              size: 11,
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
              return value.toLocaleString() + "건";
            },
          },
          title: {
            display: true,
            text: "이용객 수",
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
