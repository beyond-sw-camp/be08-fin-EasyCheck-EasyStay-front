<script setup>
import { ref } from "vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import GradientLineChart2 from "@/examples/Charts/GradientLineChart2.vue";

import Deluxe from "@/assets/img/icons/flags/Deluxe.png";
import Suite from "@/assets/img/icons/flags/Suite.png";
import Royal from "@/assets/img/icons/flags/Royal.png";
import Platinum from "@/assets/img/icons/flags/Platinum.png";
import Theme from "@/assets/img/icons/flags/teme.png";

// 객실 데이터
const sales = ref({
  deluxe: {
    country: "Deluxe(디럭스)",
    sales: 150,
    value: "288,000원",
    bounce: "2명",
    flag: Deluxe,
  },
  suite: {
    country: "Suite(스위트)",
    sales: 180,
    value: "360,000원",
    bounce: "4명",
    flag: Suite,
  },
  royal: {
    country: "Royal(로얄)",
    sales: 200,
    value: "460,000원",
    bounce: "6명",
    flag: Royal,
  },
  platinum: {
    country: "Platinum(플래티넘)",
    sales: 120,
    value: "1,208,000원",
    bounce: "2명",
    flag: Platinum,
  },
});

// 테마파크 데이터
const temes = ref({
  waterpia: {
    country: "설악 워터피아",
    sales: 120,
    value: "288,000원",
    bounce: "2명",
    flag: Theme,
  },
  plaza: {
    country: "플라자CC설악",
    sales: 110,
    value: "360,000원",
    bounce: "4명",
    flag: Theme,
  },
  waterpark: {
    country: "워터파크",
    sales: 100,
    value: "460,000원",
    bounce: "6명",
    flag: Theme,
  },
});

const themeChartData = {
  labels: ["Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "설악 워터피아",
      data: [120, 120, 130],
    },
    {
      label: "플라자CC설악",
      data: [110, 160, 100],
    },
    {
      label: "워터파크",
      data: [100, 140, 150],
    },
  ],
};

// 통계 데이터
const statistics = ref({
  popularRoom: "Deluxe(디럭스)",
  dailyTarget: "2,300",
  inquiries: "+1,462",
  revenue: "$103,430",
});
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="가장 인기있는 객실"
              :value="statistics.popularRoom"
              description="현재 가장 인기있는 객실"
              :icon="{
                component: 'ni ni-favourite-28',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="당일 목표 대비 실적"
              :value="statistics.dailyTarget"
              description="<span class='text-sm font-weight-bolder text-success'>+3%</span> 전일 대비 상승"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="문의 개수"
              :value="statistics.inquiries"
              description="현재 누적 문의 개수"
              :icon="{
                component: 'ni ni-email-83',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="매출"
              :value="statistics.revenue"
              description="<span class='text-sm font-weight-bolder text-success'>+5%</span> 실시간 변동률"
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-secondary',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>

        <!-- 매출 그래프 -->
        <div class="row">
          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart
                id="chart-line-1"
                title="각 객실별 매출 현황"
                description=""
              />
            </div>
          </div>
          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart2
                id="chart-line-2"
                title="각 테마파크별 매출 현황"
                description=""
                :chart="themeChartData"
              />
            </div>
          </div>
        </div>

        <!-- 객실 & 테마파크 관리 -->
        <div class="row mt-4">
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-3">객실 관리</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, key) in sales" :key="key">
                      <td class="w-30">
                        <div class="px-1 py-1 d-flex align-items-center">
                          <div class="ms-3">
                            <img
                              :src="sale.flag"
                              alt="Room type"
                              style="width: 40px; height: 40px"
                            />
                          </div>
                          <div class="ms-5">
                            <h6 class="mb-0 text-m">
                              종류 : {{ sale.country }}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">
                            현재 예약: {{ sale.sales }}
                          </h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">가격 : {{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <h6 class="mb-0 text-sm">
                            기준 인원 : {{ sale.bounce }}
                          </h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-3">테마파크 관리</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(teme, key) in temes" :key="key">
                      <td class="w-30">
                        <div class="px-1 py-1 d-flex align-items-center">
                          <div class="ms-3">
                            <img
                              :src="teme.flag"
                              alt="Theme park"
                              style="width: 40px; height: 40px"
                            />
                          </div>
                          <div class="ms-5">
                            <h6 class="mb-0 text-m">
                              종류 : {{ teme.country }}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">
                            현재 예약 : {{ teme.sales }}
                          </h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">
                            입장권 가격 : {{ teme.value }}
                          </h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <h6 class="mb-0 text-sm">
                            기준 인원 : {{ teme.bounce }}
                          </h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
