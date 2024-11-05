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
  // 필요한 월 추가
];

// 각 리조트의 매출 데이터를 설정합니다.
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
    title: { display: true, text: "리조트별 매출", font: { size: 24 } },
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
    const deluxeGradient = ctx.createLinearGradient(0, 0, 0, 500);
    deluxeGradient.addColorStop(0, "#FF5F6D"); // 노을 색상 1
    deluxeGradient.addColorStop(1, "#FFC371"); // 노을 색상 2

    const suiteGradient = ctx.createLinearGradient(0, 0, 0, 500);
    suiteGradient.addColorStop(0, "#FF7E5F"); // 노을 색상 1
    suiteGradient.addColorStop(1, "#FEB47B"); // 노을 색상 2

    const royalGradient = ctx.createLinearGradient(0, 0, 0, 500);
    royalGradient.addColorStop(0, "#FF6A88"); // 노을 색상 1
    royalGradient.addColorStop(1, "#FFA07A"); // 노을 색상 2

    const platinumGradient = ctx.createLinearGradient(0, 0, 0, 500);
    platinumGradient.addColorStop(0, "#F76B1C"); // 노을 색상 1
    platinumGradient.addColorStop(1, "#FC6767"); // 노을 색상 2

    const premierDeluxeGradient = ctx.createLinearGradient(0, 0, 0, 500);
    premierDeluxeGradient.addColorStop(0, "#FFB75E"); // 노을 색상 1
    premierDeluxeGradient.addColorStop(1, "#ED8F03"); // 노을 색상 2

    const premierSuiteGradient = ctx.createLinearGradient(0, 0, 0, 500);
    premierSuiteGradient.addColorStop(0, "#FF6A88"); // 노을 색상 1
    premierSuiteGradient.addColorStop(1, "#FFA07A"); // 노을 색상 2

    const presidentialSuiteGradient = ctx.createLinearGradient(0, 0, 0, 500);
    presidentialSuiteGradient.addColorStop(0, "#FF512F"); // 노을 색상 1
    presidentialSuiteGradient.addColorStop(1, "#DD2476"); // 노을 색상 2

    const grandSuiteGradient = ctx.createLinearGradient(0, 0, 0, 500);
    grandSuiteGradient.addColorStop(0, "#FF9A8B"); // 노을 색상 1
    grandSuiteGradient.addColorStop(1, "#FF6A88"); // 노을 색상 2

    const royalDeluxeGradient = ctx.createLinearGradient(0, 0, 0, 500);
    royalDeluxeGradient.addColorStop(0, "#F2C94C"); // 노을 색상 1
    royalDeluxeGradient.addColorStop(1, "#F8CBA6"); // 노을 색상 2

    const ambassadorSuiteGradient = ctx.createLinearGradient(0, 0, 0, 500);
    ambassadorSuiteGradient.addColorStop(0, "#FC5C7D"); // 노을 색상 1
    ambassadorSuiteGradient.addColorStop(1, "#6A82FB"); // 노을 색상 2

    chart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: [
          "A리조트",
          "B리조트",
          "C리조트",
          "D리조트",
          "E리조트",
          "F리조트",
          "G리조트",
          "H리조트",
          "I리조트",
          "J리조트",
        ], // 리조트 카테고리 목록
        datasets: [
          {
            label: "각 리조트별 매출 비율",
            data: monthlyData[selectedMonth.value], // 선택한 월의 데이터
            backgroundColor: [
              deluxeGradient,
              suiteGradient,
              royalGradient,
              platinumGradient,
              premierDeluxeGradient,
              premierSuiteGradient,
              presidentialSuiteGradient,
              grandSuiteGradient,
              royalDeluxeGradient,
              ambassadorSuiteGradient,
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
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tab-button.active {
  background-color: #d0d0d0; /* 활성 상태 색상 */
  font-weight: bold;
}

.tab-button:hover {
  background-color: #e0e0e0;
}
</style>
