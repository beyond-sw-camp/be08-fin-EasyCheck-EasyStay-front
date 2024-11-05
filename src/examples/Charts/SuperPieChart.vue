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
} from "chart.js/auto";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// 차트 옵션 설정
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
        size: 24, // 글씨 크기를 24px로 설정
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

// 차트 배경색을 하얀색으로 설정하는 beforeDraw 커스텀 훅 추가
const backgroundColorPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "white"; // 배경색을 하얀색으로 설정
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

// DOM이 렌더링된 후에 차트를 그리기 위한 ref와 onMounted
const chartCanvas = ref(null);

onMounted(async () => {
  await nextTick(); // DOM이 완전히 렌더링된 후 차트 생성
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");

    // 그라데이션 색상 설정
    // 노을 색상 그라데이션 설정
    const sunsetGradient1 = ctx.createLinearGradient(0, 0, 0, 500);
    sunsetGradient1.addColorStop(0, "#FFB74D"); // 따뜻한 노란색
    sunsetGradient1.addColorStop(1, "#FF6F61"); // 부드러운 오렌지색

    // 바다 색상 그라데이션 설정
    const oceanGradient1 = ctx.createLinearGradient(0, 0, 0, 500);
    oceanGradient1.addColorStop(0, "#A7DFF7"); // 연한 하늘색
    oceanGradient1.addColorStop(1, "#3F87A6"); // 짙은 바다색

    new ChartJS(ctx, {
      type: "pie",
      data: {
        labels: ["객실", "테마파크"],
        datasets: [
          {
            label: "총 객실/테마파크 매출 비율",
            data: [360000, 460000],
            backgroundColor: [
              //   deluxeGradient,
              sunsetGradient1, // 첫 번째 나뭇잎 초록색 그라데이션
              oceanGradient1, // 두 번째 나뭇잎 초록색 그라데이션
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
