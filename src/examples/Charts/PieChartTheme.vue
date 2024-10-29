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
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js/auto";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

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
      text: "테마파크 매출",
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

    // 색상 설정
    const colors = [
      "#FFB2C2", // 연한 벚꽃색
      "#FF6F91", // 진한 벚꽃색
      "#F8D3E4", // 아주 연한 핑크
    ];

    new ChartJS(ctx, {
      type: "bar", // 막대그래프로 변경
      data: {
        labels: ["설악 워터피아", "플라자 CC 설악", "워터파크"], // 카테고리 변경
        datasets: [
          {
            label: "각 테마파크별 매출 비율",
            data: [288000, 360000, 460000], // 각 카테고리의 데이터
            backgroundColor: colors, // 각 카테고리의 색상
          },
        ],
      },
      options: chartOptions,
      plugins: [backgroundColorPlugin],
    });
  }
});
</script>
