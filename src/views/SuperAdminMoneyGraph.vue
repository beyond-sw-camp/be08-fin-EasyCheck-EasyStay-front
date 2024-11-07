<template>
  <div class="container-fluid p-4">
    <div class="row">
      <!-- 상단 차트 영역 -->
      <div class="col-lg-12 mb-4">
        <div class="row g-4">
          <!-- 라인 차트 -->
          <div class="col-lg-8">
            <div class="card h-100">
              <div class="card-body">
                <SuperMoneyGraphChart
                  id="chart-line"
                  :height="500"
                  description=""
                />
              </div>
            </div>
          </div>
          <!-- 파이 차트 -->
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-body">
                <SuperPieChart />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 하단 차트 영역 -->
      <div class="col-lg-12">
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="card h-100">
              <div class="card-body">
                <SuperPieChartRoom />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card h-100">
              <div class="card-body">
                <SuperPieChartTheme />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SuperMoneyGraphChart from "../examples/Charts/SuperMoneyGraphChart.vue";
import SuperPieChart from "../examples/Charts/SuperPieChart.vue";
import SuperPieChartRoom from "../examples/Charts/SuperPieChartRoom.vue";
import SuperPieChartTheme from "../examples/Charts/SuperPieChartTheme.vue";
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-body {
  padding: 1.5rem;
}

/* 반응형 높이 조정 */
@media (min-width: 992px) {
  .h-100 {
    height: 100% !important;
  }
}
</style>
