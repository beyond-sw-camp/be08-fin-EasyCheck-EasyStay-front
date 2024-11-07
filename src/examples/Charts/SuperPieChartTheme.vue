<template>
  <div class="chart-container">
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

    <canvas ref="chartCanvas"></canvas>
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

const monthlyData = {
  1: [4800, 2200, 3500, 5200, 3800, 2800, 4200, 3200, 4500, 9800],
  2: [4500, 2000, 3200, 4800, 3500, 2500, 3800, 3000, 4200, 9200],
  3: [5200, 2800, 3800, 5500, 4200, 3200, 4500, 3500, 4800, 10500],
  4: [5800, 3200, 4200, 6200, 4800, 3800, 5200, 4200, 5500, 11200],
  5: [6500, 3800, 4800, 7200, 5500, 4500, 6000, 4800, 6200, 12500],
  6: [6200, 3500, 4500, 6800, 5200, 4200, 5800, 4500, 5800, 11800],
  7: [7200, 4200, 5200, 7800, 6200, 5200, 6800, 5200, 6800, 13500],
  8: [8500, 5200, 6200, 8800, 7500, 6200, 7800, 6200, 7800, 15200],
  9: [6800, 3800, 4800, 7200, 5800, 4800, 6200, 4800, 6200, 12800],
  10: [5500, 3200, 4200, 6500, 5200, 4200, 5500, 4200, 5500, 11500],
  11: [5200, 2800, 3800, 5800, 4800, 3800, 5200, 3800, 5200, 10800],
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
      display: false,
    },
    title: {
      display: true,
      text: "테마파크별 월별 매출 현황",
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

    const gradients = [
      ["#FFB74D", "#FF9800"], // 설악 워터피아
      ["#FFABAB", "#FF677D"], // 플라자CC 설악
      ["#C8E6C9", "#81C784"], // 인피니티풀
      ["#FF7043", "#FF3D00"], // 마리나
      ["#90CAF9", "#42A5F5"], // 산정 에코 물놀이장
      ["#F06292", "#EC407A"], // 온천 사우나
      ["#FFD54F", "#FFCA28"], // 스플라스 워터파크
      ["#FFABAB", "#FF677D"], // 라라골프클럽
      ["#A5D6A7", "#388E3C"], // 스플래시 베이
      ["#FFCCBC", "#D32F2F"], // 르 스페이스
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
          "설악 워터피아",
          "플라자CC 설악",
          "인피니티풀",
          "마리나",
          "산정 에코 물놀이장",
          "온천 사우나",
          "스플라스 워터파크",
          "라라골프클럽",
          "스플래시 베이",
          "르 스페이스",
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
.chart-container {
  max-width: 1000px;
  height: 590px;
  background-color: white;
  padding: 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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

canvas {
  width: 100% !important;
  height: calc(100% - 60px) !important;
}

@media (max-width: 768px) {
  .chart-container {
    padding: 30px;
    height: 500px;
  }

  .month-select {
    font-size: 14px;
    min-width: 120px;
  }
}
</style>
