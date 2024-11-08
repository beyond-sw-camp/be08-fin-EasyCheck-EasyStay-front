<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const chartId = "bar-chart";
const title = ref("리조트별 매출 현황");
const chartInstance = ref(null);

const chartLineData = ref({
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
      label: "한화 설악 쏘라노",
      data: [
        45000, 42000, 52000, 58000, 75000, 48000, 62000, 85000, 68000, 55000,
        48000,
      ],
    },
    {
      label: "한화 거제 벨버디어",
      data: [
        38000, 35000, 42000, 48000, 62000, 58000, 65000, 78000, 58000, 52000,
        45000,
      ],
    },
    {
      label: "한화 산정호수 안시",
      data: [
        32000, 28000, 35000, 42000, 48000, 45000, 52000, 68000, 48000, 42000,
        38000,
      ],
    },
    {
      label: "스플라스 리솜",
      data: [
        28000, 25000, 32000, 38000, 45000, 42000, 48000, 65000, 45000, 38000,
        35000,
      ],
    },
    {
      label: "인스파이어 리조트",
      data: [
        42000, 38000, 45000, 52000, 68000, 62000, 72000, 88000, 65000, 58000,
        52000,
      ],
    },
    /**
     * 
     {
       label: "시그니엘호텔",
       data: [
         68000, 65000, 72000, 78000, 85000, 82000, 88000, 92000, 85000, 78000,
         75000,
       ],
     },
     {
       label: "더 플라자호텔",
       data: [
         58000, 55000, 62000, 68000, 75000, 72000, 78000, 85000, 72000, 68000,
         65000,
       ],
     },
     {
       label: "MATIÈ Osiria",
       data: [
         48000, 45000, 52000, 58000, 65000, 62000, 75000, 82000, 68000, 55000,
         52000,
       ],
     },
     {
       label: "여수 벨메르",
       data: [
         38000, 35000, 42000, 48000, 55000, 52000, 65000, 78000, 58000, 48000,
         42000,
       ],
     },
     {
       label: "브리드 양양",
       data: [
         32000, 28000, 35000, 42000, 48000, 45000, 58000, 72000, 52000, 42000,
         38000,
       ],
     },
     */
  ],
});

onMounted(() => {
  const ctx = document.getElementById(chartId).getContext("2d");

  // 컬러 팔레트 정의
  const colors = {
    borders: [
      "#fd8a69",
      "#ffcd4a",
      "#afd485",
      "#82cbc4",
      "#58ccff",
      "#0e6ca5",
      "#9fa9d8",
      "#b96bc6",
      "#fb7a09",
      "#000000",
    ],
    backgrounds: [
      "rgba(253, 138, 105, 0.1)",
      "rgba(255, 205, 74, 0.1)",
      "rgba(175, 212, 133, 0.1)",
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
      labels: chartLineData.value.labels,
      datasets: chartLineData.value.datasets.map((dataset, index) => ({
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
              return value.toLocaleString() + "원";
            },
          },
          title: {
            display: true,
            text: "매출액",
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
