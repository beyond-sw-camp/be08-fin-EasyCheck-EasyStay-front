<template>
  <div
    style="
      max-width: 1000px;
      height: 590px;
      background-color: white;
      padding: 50px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    "
  >
    <!-- 월 선택 탭 -->
    <div class="month-tabs">
      <button
        v-for="(month, index) in months"
        :key="index"
        :class="['tab-button', { active: selectedMonth === month.value }]"
        @click="setMonth(month.value)"
      >
        {{ month.label }}
      </button>
    </div>

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

const chartCanvas = ref(null);
const selectedMonth = ref("march");

const months = [
  { label: "3월", value: "march" },
  { label: "4월", value: "april" },
  { label: "5월", value: "may" },
];

const monthlyData = {
  march: [
    360000, 460000, 1208000, 500000, 600000, 750000, 900000, 650000, 580000,
    670000,
  ],
  april: [
    300000, 420000, 1100000, 450000, 590000, 700000, 860000, 610000, 540000,
    630000,
  ],
  may: [
    330000, 440000, 1150000, 480000, 610000, 730000, 890000, 640000, 570000,
    660000,
  ],
};

const setMonth = (month) => {
  selectedMonth.value = month;
  updateChartData();
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "테마파크별 매출", font: { size: 24 } },
  },
  layout: { padding: { top: 10, left: 10, right: 10, bottom: 10 } },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
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

let chart;

onMounted(async () => {
  await nextTick();
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");

    // 그라데이션 색상 설정
    // 테마파크별 그라데이션 색상 설정
    const parkAGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkAGradient.addColorStop(0, "#FFB74D"); // 밝은 노란색
    parkAGradient.addColorStop(1, "#FF9800"); // 오렌지색

    const parkBGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkBGradient.addColorStop(0, "#FFABAB"); // 연한 빨간색
    parkBGradient.addColorStop(1, "#FF677D"); // 핑크색

    const parkCGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkCGradient.addColorStop(0, "#C8E6C9"); // 연한 초록색
    parkCGradient.addColorStop(1, "#81C784"); // 초록색

    const parkDGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkDGradient.addColorStop(0, "#FF7043"); // 주황색
    parkDGradient.addColorStop(1, "#FF3D00"); // 짙은 주황색

    const parkEGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkEGradient.addColorStop(0, "#90CAF9"); // 연한 파란색
    parkEGradient.addColorStop(1, "#42A5F5"); // 파란색

    const parkFGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkFGradient.addColorStop(0, "#F06292"); // 핑크색
    parkFGradient.addColorStop(1, "#EC407A"); // 다크 핑크색

    const parkGGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkGGradient.addColorStop(0, "#FFD54F"); // 노란색
    parkGGradient.addColorStop(1, "#FFCA28"); // 깊은 노란색

    const parkHGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkHGradient.addColorStop(0, "#FFABAB"); // 연한 빨간색
    parkHGradient.addColorStop(1, "#FF677D"); // 핑크색

    const parkIGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkIGradient.addColorStop(0, "#A5D6A7"); // 연한 초록색
    parkIGradient.addColorStop(1, "#388E3C"); // 진한 초록색

    const parkJGradient = ctx.createLinearGradient(0, 0, 0, 500);
    parkJGradient.addColorStop(0, "#FFCCBC"); // 밝은 오렌지색
    parkJGradient.addColorStop(1, "#D32F2F"); // 짙은 빨간색

    chart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: [
          "테마파크 A",
          "테마파크 B",
          "테마파크 C",
          "테마파크 D",
          "테마파크 E",
          "테마파크 F",
          "테마파크 G",
          "테마파크 H",
          "테마파크 I",
          "테마파크 J",
        ], // 테마파크 카테고리 목록
        datasets: [
          {
            label: "각 테마파크별 매출 비율",
            data: monthlyData[selectedMonth.value],
            backgroundColor: [
              parkAGradient,
              parkBGradient,
              parkCGradient,
              parkDGradient,
              parkEGradient,
              parkFGradient,
              parkGGradient,
              parkHGradient,
              parkIGradient,
              parkJGradient,
            ],
          },
        ],
      },
      options: chartOptions,
      plugins: [backgroundColorPlugin],
    });
    updateChartData();
  }
});

const updateChartData = () => {
  if (chart) {
    chart.data.datasets[0].data = monthlyData[selectedMonth.value];
    chart.update();
  }
};
</script>

<style>
.month-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* 여백 추가 */
}

.tab-button {
  background-color: #ffffff; /* 기본 배경색 */
  border: none; /* 테두리 제거 */
  border-radius: 8px; /* 모서리 둥글게 */
  padding: 10px 20px; /* 패딩 추가 */
  margin: 0 10px; /* 버튼 간격 */
  font-size: 16px; /* 글자 크기 */
  font-weight: 600; /* 글자 두께 */
  color: #555; /* 기본 글자 색상 */
  cursor: pointer; /* 커서 모양 변경 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

.tab-button.active {
  background-color: #a0ceff; /* 선택된 버튼의 배경색 */
  color: white; /* 선택된 버튼의 글자 색상 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* 선택된 버튼의 그림자 */
}

.tab-button:hover {
  background-color: #e7f1ff; /* 호버 시 배경색 변경 */
  color: #007bff; /* 호버 시 글자 색상 변경 */
}
</style>
