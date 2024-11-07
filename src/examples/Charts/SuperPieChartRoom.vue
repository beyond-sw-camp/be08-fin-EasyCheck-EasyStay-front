<template>
  <div class="card">
    <div class="select-container">
      <select
        v-model="selectedMonth"
        class="month-select"
        @change="setMonth(selectedMonth)"
      >
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.label }}
        </option>
      </select>
    </div>

    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Chart as ChartJS } from "chart.js/auto";

const chartCanvas = ref(null);
const selectedMonth = ref("1");

const months = [
  { label: "1월", value: "1" },
  { label: "2월", value: "2" },
  { label: "3월", value: "3" },
  { label: "4월", value: "4" },
  { label: "5월", value: "5" },
  { label: "6월", value: "6" },
  { label: "7월", value: "7" },
  { label: "8월", value: "8" },
  { label: "9월", value: "9" },
  { label: "10월", value: "10" },
  { label: "11월", value: "11" },
];

// 월별 데이터
const monthlyData = {
  1: [68000, 58000, 42000, 48000, 45000, 38000, 32000, 28000, 38000, 32000],
  2: [65000, 55000, 38000, 45000, 42000, 35000, 28000, 25000, 35000, 28000],
  3: [72000, 62000, 45000, 52000, 52000, 42000, 35000, 32000, 42000, 35000],
  4: [78000, 68000, 52000, 58000, 58000, 48000, 42000, 38000, 48000, 42000],
  5: [85000, 75000, 68000, 65000, 75000, 62000, 48000, 45000, 55000, 48000],
  6: [82000, 72000, 62000, 62000, 48000, 58000, 45000, 42000, 52000, 45000],
  7: [88000, 78000, 72000, 75000, 62000, 65000, 52000, 48000, 65000, 58000],
  8: [92000, 85000, 88000, 82000, 85000, 78000, 68000, 65000, 78000, 72000],
  9: [85000, 72000, 65000, 68000, 68000, 58000, 48000, 45000, 58000, 52000],
  10: [78000, 68000, 58000, 55000, 55000, 52000, 42000, 38000, 48000, 42000],
  11: [75000, 65000, 52000, 52000, 48000, 45000, 38000, 35000, 42000, 38000],
};

const setMonth = (month) => {
  selectedMonth.value = month;
  updateChartData();
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      display: false, // 범례 숨김
    },
    title: {
      display: true,
      text: "시설별 매출 현황",
      font: { size: 24 },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return value.toLocaleString() + "만원";
        },
      },
    },
  },
};

let chart;

onMounted(async () => {
  await nextTick();
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");

    // 그라데이션 설정
    const gradients = [
      ["#1864AB", "#4BA6DA"], // 시그니엘
      ["#A8B8D8", "#C8D8F8"], // 플라자
      ["#74C0FC", "#94E0FC"], // 인스파이어드
      ["#DA77F2", "#FA97FF"], // 마티에
      ["#FF6B6B", "#FF8B8B"], // 설악
      ["#4BA6DA", "#6BC6FA"], // 벨버디어
      ["#37B24D", "#57D26D"], // 안시
      ["#FFA500", "#FFC540"], // 리솜
      ["#FFA94D", "#FFC96D"], // 벨메르
      ["#000000", "#404040"], // 브리드
    ].map(([color1, color2]) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    });

    chart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: [
          "시그니엘호텔",
          "더 플라자호텔",
          "인스파이어드 리조트",
          "MATIÈ Osiria",
          "한화 설악 쏘라노",
          "한화 거제 벨버디어",
          "한화 산정호수 안시",
          "스플라스 리솜",
          "여수 벨메르",
          "브리드 양양",
        ],
        datasets: [
          {
            data: monthlyData[selectedMonth.value],
            backgroundColor: gradients,
            borderRadius: 5,
            barPercentage: 0.7,
          },
        ],
      },
      options: chartOptions,
    });
  }
});

const updateChartData = () => {
  if (chart) {
    chart.data.datasets[0].data = monthlyData[selectedMonth.value];
    chart.update();
  }
};
</script>

<style scoped>
.card {
  max-width: 100%;
  height: 100%;
  background-color: white;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.select-container {
  margin-bottom: 25px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}

.month-select {
  position: relative;
  padding: 10px 35px 10px 15px;
  font-size: 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
  cursor: pointer;
  min-width: 140px;
  color: #495057;
  font-weight: 500;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231864ab' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 18px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.month-select:hover {
  border-color: #1864ab;
  background-color: white;
}

.month-select:focus {
  border-color: #1864ab;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(24, 100, 171, 0.15);
}

.month-select option {
  padding: 10px;
  font-size: 15px;
  background-color: white;
  color: #495057;
}

.chart-wrapper {
  flex: 1;
  position: relative;
  height: calc(100% - 70px);
  width: 100%;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 768px) {
  .card {
    padding: 20px;
    min-height: 400px;
  }

  .select-container {
    padding-right: 10px;
    margin-bottom: 20px;
  }

  .month-select {
    font-size: 14px;
    padding: 8px 30px 8px 12px;
    min-width: 120px;
  }
}
</style>
