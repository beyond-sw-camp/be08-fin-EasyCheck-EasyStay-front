<script setup>
import { onMounted, ref, nextTick } from "vue";
import Chart from "chart.js/auto";

const canvasRef = ref(null);
const chartHeight = ref("500");
const chartDescription = ref("");

const chartData = ref({
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
    // 1위 시그니엘호텔
    {
      label: "시그니엘호텔",
      data: [
        68000, 65000, 72000, 78000, 85000, 82000, 88000, 92000, 85000, 78000,
        75000,
      ],
      borderColor: "#1864AB",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: false,
    },
    // 2위 더 플라자호텔
    {
      label: "더 플라자호텔",
      data: [
        58000, 55000, 62000, 68000, 75000, 72000, 78000, 85000, 72000, 68000,
        65000,
      ],
      borderColor: "#A8B8D8",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: false,
    },
    // 3위 인스파이어드 리조트
    {
      label: "인스파이어드 리조트",
      data: [
        42000, 38000, 45000, 52000, 68000, 62000, 72000, 88000, 65000, 58000,
        52000,
      ],
      borderColor: "#74C0FC",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: false,
    },
    // 4위 MATIÈ Osiria
    {
      label: "MATIÈ Osiria",
      data: [
        48000, 45000, 52000, 58000, 65000, 62000, 75000, 82000, 68000, 55000,
        52000,
      ],
      borderColor: "#DA77F2",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: false,
    },
    // 5위 한화 설악 쏘라노
    {
      label: "한화 설악 쏘라노",
      data: [
        45000, 42000, 52000, 58000, 75000, 48000, 62000, 85000, 68000, 55000,
        48000,
      ],
      borderColor: "#FF6B6B",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: false,
    },
    // 나머지 시설들 (처음에는 숨김)
    {
      label: "한화 거제 벨버디어",
      data: [
        38000, 35000, 42000, 48000, 62000, 58000, 65000, 78000, 58000, 52000,
        45000,
      ],
      borderColor: "#4BA6DA",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: true,
    },
    {
      label: "한화 산정호수 안시",
      data: [
        32000, 28000, 35000, 42000, 48000, 45000, 52000, 68000, 48000, 42000,
        38000,
      ],
      borderColor: "#37B24D",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: true,
    },
    {
      label: "스플라스 리솜",
      data: [
        28000, 25000, 32000, 38000, 45000, 42000, 48000, 65000, 45000, 38000,
        35000,
      ],
      borderColor: "#FFA500",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: true,
    },
    {
      label: "여수 벨메르",
      data: [
        38000, 35000, 42000, 48000, 55000, 52000, 65000, 78000, 58000, 48000,
        42000,
      ],
      borderColor: "#FFA94D",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: true,
    },
    {
      label: "브리드 양양",
      data: [
        32000, 28000, 35000, 42000, 48000, 45000, 58000, 72000, 52000, 42000,
        38000,
      ],
      borderColor: "#000000",
      backgroundColor: "transparent",
      borderWidth: 2,
      tension: 0.4,
      hidden: true,
    },
  ],
});

const initChart = async () => {
  try {
    await nextTick();

    if (!canvasRef.value) return;

    const ctx = canvasRef.value.getContext("2d");
    if (!ctx) return;

    new Chart(ctx, {
      type: "line",
      data: chartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "start",
            labels: {
              padding: 20,
              boxWidth: 12,
              usePointStyle: true,
              font: {
                size: 11,
              },
            },
          },
          title: {
            display: true,
            text: "시설별 월별 매출 현황",
            color: "#333",
            font: {
              size: 16,
              weight: "bold",
            },
            padding: { bottom: 20 },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            grid: {
              color: "#e9ecef",
            },
            ticks: {
              maxTicksLimit: 10,
              callback: function (value) {
                return value.toLocaleString() + "만원";
              },
              font: {
                size: 11,
              },
              padding: 10,
              color: "#666666",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              color: "#666666",
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.4,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });
  } catch (error) {
    console.error("Error initializing chart:", error);
  }
};

onMounted(() => {
  initChart();
});
</script>

<template>
  <div class="card z-index-2">
    <div class="pb-0 card-header mb-0">
      <p v-if="chartDescription" class="text-sm" v-html="chartDescription" />
    </div>
    <div class="p-3 card-body">
      <div class="chart-container" :style="{ height: `${chartHeight}px` }">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
}
</style>
