<script setup>
import SuperMoneyGraphChart from "../examples/Charts/SuperMoneyGraphChart.vue";
import SuperPieChart from "../examples/Charts/SuperPieChart.vue";
import SuperPieChartRoom from "../examples/Charts/SuperPieChartRoom.vue";
import SuperPieChartTheme from "../examples/Charts/SuperPieChartTheme.vue";
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
              <SuperMoneyGraphChart
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
                    {
                      label: '프리미어 디럭스',
                      data: [160, 190, 180],
                    },
                    {
                      label: '프리미어 스위트',
                      data: [190, 210, 190],
                    },
                    {
                      label: '프레지덴셜 스위트',
                      data: [220, 230, 200],
                    },
                    {
                      label: '그랜드 스위트',
                      data: [210, 190, 180],
                    },
                    {
                      label: '로열 디럭스',
                      data: [180, 170, 160],
                    },
                    {
                      label: '엠버서더 스위트',
                      data: [200, 220, 210],
                    },
                  ],
                }"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <!-- 원형 그래프 -->
            <SuperPieChart />
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

          <div class="col-lg-6">
            <!-- 원형 그래프 -->
            <SuperPieChartRoom />
          </div>
          <div class="col-lg-6">
            <!-- 원형 그래프 -->
            <SuperPieChartTheme />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
