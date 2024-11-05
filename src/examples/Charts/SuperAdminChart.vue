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

  // 첫 번째 그래디언트를 밝은 핑크색 계열로 변경
  var gradientStroke1 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke1.addColorStop(1, "rgba(255,182,193,0.3)"); // 밝은 핑크
  gradientStroke1.addColorStop(0.2, "rgba(255,182,193,0.0)"); // 투명한 핑크

  // 두 번째 그래디언트를 밝은 하늘색 계열로 변경
  var gradientStroke2 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke2.addColorStop(1, "rgba(135,206,250,0.3)"); // 밝은 하늘색
  gradientStroke2.addColorStop(0.2, "rgba(135,206,250,0.0)"); // 투명한 하늘색

  // 세 번째 그래디언트를 파스텔 민트색 계열로 변경
  var gradientStroke3 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke3.addColorStop(1, "rgba(152,251,152,0.3)"); // 파스텔 민트색
  gradientStroke3.addColorStop(0.2, "rgba(152,251,152,0.0)"); // 투명한 민트색

  // 네 번째 그래디언트를 연한 옐로우 계열로 변경
  var gradientStroke4 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke4.addColorStop(1, "rgba(255,255,204,0.3)"); // 연한 옐로우
  gradientStroke4.addColorStop(0.2, "rgba(255,255,204,0.0)"); // 투명한 옐로우

  // 다섯 번째 그래디언트를 라벤더 계열로 변경
  var gradientStroke5 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke5.addColorStop(1, "rgba(230,230,250,0.3)"); // 라벤더
  gradientStroke5.addColorStop(0.2, "rgba(230,230,250,0.0)"); // 투명한 라벤더

  // 여섯 번째 그래디언트를 밝은 오렌지 계열로 변경
  var gradientStroke6 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke6.addColorStop(1, "rgba(255,218,185,0.3)"); // 밝은 오렌지
  gradientStroke6.addColorStop(0.2, "rgba(255,218,185,0.0)"); // 투명한 오렌지

  // 일곱 번째 그래디언트를 연한 청록색 계열로 변경
  var gradientStroke7 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke7.addColorStop(1, "rgba(176,224,230,0.3)"); // 연한 청록색
  gradientStroke7.addColorStop(0.2, "rgba(176,224,230,0.0)"); // 투명한 청록색

  // 여덟 번째 그래디언트를 파스텔 핑크 계열로 변경
  var gradientStroke8 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke8.addColorStop(1, "rgba(255,182,193,0.3)"); // 파스텔 핑크
  gradientStroke8.addColorStop(0.2, "rgba(255,182,193,0.0)"); // 투명한 파스텔 핑크

  // 아홉 번째 그래디언트를 청록 계열로 변경
  var gradientStroke9 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke9.addColorStop(1, "rgba(64,224,208,0.3)"); // 청록색
  gradientStroke9.addColorStop(0.2, "rgba(64,224,208,0.0)"); // 투명한 청록색

  // 열 번째 그래디언트를 밝은 파란색 계열로 변경
  var gradientStroke10 = gradientLineChart.createLinearGradient(0, 230, 0, 50);
  gradientStroke10.addColorStop(1, "rgba(173,216,230,0.3)"); // 밝은 파란색
  gradientStroke10.addColorStop(0.2, "rgba(173,216,230,0.0)"); // 투명한 파란색

  // 중복된 차트 방지를 위해 기존 차트 제거
  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  // 네 개의 데이터셋이 있는 경우
  if (props.chart.datasets.length == 10) {
    new Chart(gradientLineChart, {
      type: "bar",
      data: {
        labels: props.chart.labels,
        datasets: [
          {
            label: props.chart.datasets[0].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#fd8a69",
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
            borderColor: "#ffcd4a",
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
            borderColor: "#afd485",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke3,
            fill: true,
            data: props.chart.datasets[2].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[3].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#82cbc4",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke4,
            fill: true,
            data: props.chart.datasets[3].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[4].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#58ccff",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke5,
            fill: true,
            data: props.chart.datasets[4].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[5].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#0e6ca5",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke6,
            fill: true,
            data: props.chart.datasets[5].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[6].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#9fa9d8",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke7,
            fill: true,
            data: props.chart.datasets[6].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[7].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#b96bc6",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke8,
            fill: true,
            data: props.chart.datasets[7].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[8].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#fb7a09",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke9,
            fill: true,
            data: props.chart.datasets[8].data,
            maxBarThickness: 6,
          },
          {
            label: props.chart.datasets[9].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#000000",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: gradientStroke10,
            fill: true,
            data: props.chart.datasets[9].data,
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
