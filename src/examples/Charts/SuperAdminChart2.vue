<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

// 컴포넌트 외부에서 데이터를 받아오기 위한 인터페이스
const props = defineProps({
  id: {
    type: String,
    required: true,
  }, // 차트를 표시할 <canvas>의 ID
  height: {
    type: String,
    default: "300",
  }, // 차트의 높이
  title: {
    type: String,
    default: "",
  }, // 차트 제목
  description: {
    type: String,
    default: "",
  }, // 차트 설명
  chart: {
    // 차트 데이터와 설정
    type: Object,
    required: true,
    labels: Array, // X축에 표시할 레이블 목록
    datasets: {
      // 데이터셋 정보 (여러 개 가능)
      type: Array,
      label: String,
      data: Array,
    },
  },
});

onMounted(() => {
  var gradientLineChart = document.getElementById(props.id).getContext("2d");

  var gradientStroke1 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke1.addColorStop(1, "rgba(255, 182, 193, 0.2)"); // 매우 연한 #FFB6C1
  gradientStroke1.addColorStop(0.5, "rgba(255, 182, 193, 0.1)"); // 더 밝고 연한 핑크색
  gradientStroke1.addColorStop(0, "rgba(255, 182, 193, 0.0)"); // 완전히 투명한 핑크색

  var gradientStroke2 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke2.addColorStop(1, "rgba(135, 206, 235, 0.2)"); // 연한 하늘색 #87CEEB
  gradientStroke2.addColorStop(0.5, "rgba(135, 206, 235, 0.1)"); // 더 연한 하늘색
  gradientStroke2.addColorStop(0, "rgba(135, 206, 235, 0.0)"); // 투명한 하늘색

  var gradientStroke3 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke3.addColorStop(1, "rgba(216, 191, 216, 0.2)"); // 연한 보라색 #D8BFD8
  gradientStroke3.addColorStop(0.5, "rgba(216, 191, 216, 0.1)"); // 더 연한 보라색
  gradientStroke3.addColorStop(0, "rgba(216, 191, 216, 0.0)"); // 투명한 보라색

  // 중복된 차트 방지를 위해 기존 차트 제거
  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  // 네 개의 데이터셋이 있는 경우
  if (props.chart.datasets.length == 3) {
    new Chart(gradientLineChart, {
      type: "line",
      data: {
        labels: props.chart.labels,
        datasets: [
          {
            label: props.chart.datasets[0].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#FFB6C1 ",
            backgroundColor: gradientStroke1,
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            fill: true,
            data: props.chart.datasets[0].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[1].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#87ceeb",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke2,
            fill: true,
            data: props.chart.datasets[1].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[2].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#cfcffb",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke3,
            fill: true,
            data: props.chart.datasets[2].data,
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#fbfbfb",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ccc",
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  } else if (props.chart.datasets.length == 1) {
    new Chart(gradientLineChart, {
      type: "line",
      data: {
        labels: props.chart.labels,
        datasets: [
          {
            label: props.chart.datasets[0].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#ef4d4d",
            backgroundColor: gradientStroke1,
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            fill: true,
            data: props.chart.datasets[0].data,
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#fbfbfb",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ccc",
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  }
});
</script>
<template>
  <div class="card z-index-2">
    <div class="pb-0 card-header mb-0">
      <h6>{{ props.title }}</h6>
      <!--  eslint-disable-next-line vue/no-v-html -->
      <p v-if="props.description" class="text-sm" v-html="props.description" />
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas
          :id="props.id"
          class="chart-canvas"
          :height="props.height"
        ></canvas>
      </div>
    </div>
  </div>
</template>
