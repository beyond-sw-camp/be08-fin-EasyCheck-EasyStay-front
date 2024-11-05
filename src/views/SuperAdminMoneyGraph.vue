<script setup>
import MoneyGraphChart from "../examples/Charts/MoneyGraphChart.vue";
import PieChart from "../examples/Charts/PieChart.vue";
import PieChartRoom from "../examples/Charts/PieChartRoom.vue";
import PieChartService from "../examples/Charts/PieChartService.vue";
import PieChartTheme from "../examples/Charts/PieChartTheme.vue";
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <!-- 매출 그래프 -->
        <div class="row">
          <div class="col-lg-8 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <MoneyGraphChart
                id="chart-line"
                title="A 리조트 총 매출 현황"
                description=""
                :chart="{
                  labels: ['Aug', 'Sep', 'Oct'],
                  datasets: [
                    {
                      label: '디럭스',
                      data: [150, 200, 150],
                    },
                    {
                      label: '스위트',
                      data: [180, 160, 200],
                    },
                    {
                      label: '로얄',
                      data: [200, 140, 130],
                    },
                    {
                      label: '플래티넘',
                      data: [120, 180, 170],
                    },
                  ],
                }"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <!-- 원형 그래프 -->
            <PieChart />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-12 mb-lg-0 mb-4">
            <div class="card">
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <!-- 원형 그래프 -->
            <PieChartRoom />
          </div>
          <div class="col-lg-4">
            <!-- 원형 그래프 -->
            <PieChartTheme />
          </div>
          <div class="col-lg-4">
            <!-- 원형 그래프 -->
            <PieChartService />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
