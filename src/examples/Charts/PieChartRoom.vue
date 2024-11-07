<template>
  <div
    style="
      max-width: 700px;
      height: 590px;
      background-color: white;
      padding: 50px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    "
  >
    <canvas ref="chartCanvas" style="max-height: 700px"></canvas>
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
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js/auto";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // 범례 숨기기
    },
    title: {
      display: true,
      text: "객실별 매출",
      font: {
        size: 24,
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
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
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

const chartCanvas = ref(null);

onMounted(async () => {
  await nextTick();
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");

    // 그라데이션 색상 설정
    const deluxeGradient = ctx.createLinearGradient(0, 0, 0, 500);
    deluxeGradient.addColorStop(0, "#FF7E5F"); // 밝은 주황색
    deluxeGradient.addColorStop(1, "#FEB47B"); // 연한 노란색

    const suiteGradient = ctx.createLinearGradient(0, 0, 0, 500);
    suiteGradient.addColorStop(0, "#FF6A88"); // 분홍색
    suiteGradient.addColorStop(1, "#FFA07A"); // 살구색

    const royalGradient = ctx.createLinearGradient(0, 0, 0, 500);
    royalGradient.addColorStop(0, "#FF7E5F"); // 노란 주황색
    royalGradient.addColorStop(1, "#FEB47B"); // 밝은 노란색

    const platinumGradient = ctx.createLinearGradient(0, 0, 0, 500);
    platinumGradient.addColorStop(0, "#F76B1C"); // 붉은 주황색
    platinumGradient.addColorStop(1, "#FC6767"); // 밝은 붉은색

    new ChartJS(ctx, {
      type: "bar", // 막대그래프로 변경
      data: {
        labels: ["디럭스", "스위트", "로얄", "플래티넘"], // 카테고리 추가
        datasets: [
          {
            label: "",
            data: [360000, 460000, 1208000, 500000], // 각 카테고리의 데이터
            backgroundColor: [
              deluxeGradient,
              suiteGradient,
              royalGradient,
              platinumGradient,
            ],
          },
        ],
      },
      options: chartOptions,
      plugins: [backgroundColorPlugin],
    });
  }
});
</script>
