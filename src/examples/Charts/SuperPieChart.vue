<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js/auto";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartCanvas = ref(null);

// 이전 데이터의 평균값을 계산
const calculateTotal = () => {
  // 객실 매출 (10개 시설의 11개월 평균)
  const roomRevenue =
    [
      68000,
      58000,
      42000,
      48000,
      45000,
      38000,
      32000,
      28000,
      38000,
      32000, // 1월
    ].reduce((a, b) => a + b, 0) * 11; // 11개월 합계

  // 테마파크 매출 (10개 시설의 11개월 평균)
  const themeParkRevenue =
    [
      4800,
      2200,
      3500,
      5200,
      3800,
      2800,
      4200,
      3200,
      4500,
      9800, // 1월
    ].reduce((a, b) => a + b, 0) * 11; // 11개월 합계

  return {
    room: roomRevenue,
    themePark: themeParkRevenue,
  };
};

const totals = calculateTotal();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "총 객실/테마파크 매출 비율",
      font: {
        size: 24,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value.toLocaleString()}만원 (${percentage}%)`;
        },
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    },
  },
};

const backgroundColorPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

onMounted(async () => {
  await nextTick();
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");

    const sunsetGradient1 = ctx.createLinearGradient(0, 0, 0, 500);
    sunsetGradient1.addColorStop(0, "#FFB74D");
    sunsetGradient1.addColorStop(1, "#FF6F61");

    const oceanGradient1 = ctx.createLinearGradient(0, 0, 0, 500);
    oceanGradient1.addColorStop(0, "#A7DFF7");
    oceanGradient1.addColorStop(1, "#3F87A6");

    new ChartJS(ctx, {
      type: "pie",
      data: {
        labels: ["객실", "테마파크"],
        datasets: [
          {
            label: "총 객실/테마파크 매출 비율",
            data: [totals.room, totals.themePark],
            backgroundColor: [sunsetGradient1, oceanGradient1],
          },
        ],
      },
      options: chartOptions,
      plugins: [backgroundColorPlugin],
    });
  }
});
</script>

<style scoped>
.chart-container {
  max-width: 700px;
  height: 590px;
  background-color: white;
  padding: 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
