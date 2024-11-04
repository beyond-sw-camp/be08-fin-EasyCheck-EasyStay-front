// 최종 관리자 대시보드

<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import GradientLineChart2 from "@/examples/Charts/GradientLineChart2.vue";
import Deluxe from "@/assets/img/icons/flags/Deluxe.png";
import Suite from "@/assets/img/icons/flags/Suite.png";
import Royal from "@/assets/img/icons/flags/Royal.png";
import Platinum from "@/assets/img/icons/flags/Platinum.png";
import Theme from "@/assets/img/icons/flags/teme.png";

import { onMounted } from "vue";

onMounted(() => {});

// 객실 관리
const sales = {
  us: {
    country: "Deluxe(디럭스)",
    sales: 10,
    value: "$288,000",
    bounce: "2명",
    flag: Deluxe,
  },
  germany: {
    country: "Suite(스위트)",
    sales: 10,
    value: "$360,000",
    bounce: "4명",
    flag: Suite,
  },
  britain: {
    country: "Royal(로얄)",
    sales: 10,
    value: "$460,000",
    bounce: "6명",
    flag: Royal,
  },
  brasil: {
    country: "Platinum(플래티넘)",
    sales: 10,
    value: "$1,208,000",
    bounce: "2명",
    flag: Platinum,
  },
};
// 객실 관리
const temes = {
  us: {
    country: "설악 워터피아",
    sales: 10,
    value: "$288,000",
    bounce: "2명",
    flag: Theme,
  },
  germany: {
    country: "플라자CC설악",
    sales: 10,
    value: "$360,000",
    bounce: "4명",
    flag: Theme,
  },
  britain: {
    country: "워터파크",
    sales: 10,
    value: "$460,000",
    bounce: "6명",
    flag: Theme,
  },
};
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <!-- 모든 숙박시설 중 가장 인기있는 객실 -->
            <mini-statistics-card
              title="가장 인기있는 객실"
              value="Deluxe(디럭스)"
              description="현재 가장 인기있는 객실"
              :icon="{
                component: 'ni ni-favourite-28',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- 모든 숙박시설 객실 총 매출 -->
            <mini-statistics-card
              title="숙박시설 객실 총 매출"
              value="2,300"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> 전일 대비 상승"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- 모든 숙박시설 테마파크 총 매출 -->
            <mini-statistics-card
              title="테마파크 총 매출"
              value="+1,462"
              description="현재 누적 문의 개수"
              :icon="{
                component: 'ni ni-email-83',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- 모든 숙박시설 합산 총 매출 -->
            <mini-statistics-card
              title="매출 총합"
              value="$103,430"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span> 실시간 변동률"
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
            <!-- line chart -->
            <div class="card z-index-2">
              <!-- 각 숙박시설별 매출 현황 월 단위로 -->
              <gradient-line-chart
                id="chart-line-1"
                title="각 숙박시설 월별 매출 현황"
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
          <div class="col-lg-6 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <!-- 각 숙박시설별 테마파크 총 매출 현황 월 단위로 -->
              <gradient-line-chart2
                id="chart-line-2"
                title="각 테마파크별 매출 현황"
                description=""
                :chart="{
                  labels: ['Aug', 'Sep', 'Oct'],
                  datasets: [
                    {
                      label: '설악 워터피아',
                      data: [120, 120, 130],
                    },
                    {
                      label: '플라자CC설악',
                      data: [110, 160, 100],
                    },
                    {
                      label: '워터파크',
                      data: [100, 140, 150],
                    },
                  ],
                }"
              />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-3">숙박시설 관리</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-1 py-1 d-flex align-items-center">
                          <div class="ms-3">
                            <img
                              :src="sale.flag"
                              alt="Country flag"
                              style="width: 40px; height: 40px"
                            />
                          </div>
                          <div class="ms-5">
                            <!-- <p class="mb-0 text-s font-weight-bold">
                              객실 종류:
                            </p> -->
                            <h6 class="mb-0 text-m">
                              종류 : {{ sale.country }}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <!-- <p class="mb-0 text-s font-weight-bold">
                            객실 총 개수:
                          </p> -->
                          <h6 class="mb-0 text-sm">개수 : {{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <!-- <p class="mb-0 text-s font-weight-bold">가격:</p> -->
                          <h6 class="mb-0 text-sm">가격 : {{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <!-- <p class="mb-0 text-s font-weight-bold">:</p> -->
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
                    <tr v-for="(teme, index) in temes" :key="index">
                      <td class="w-30">
                        <div class="px-1 py-1 d-flex align-items-center">
                          <div class="ms-3">
                            <img
                              :src="teme.flag"
                              alt="Country flag"
                              style="width: 40px; height: 40px"
                            />
                          </div>
                          <div class="ms-5">
                            <!-- <p class="mb-0 text-s font-weight-bold">
                              객실 종류:
                            </p> -->
                            <h6 class="mb-0 text-m">
                              종류 : {{ teme.country }}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <!-- <p class="mb-0 text-s font-weight-bold">
                            객실 총 개수:
                          </p> -->
                          <h6 class="mb-0 text-sm">
                            시설 개수 : {{ teme.sales }}
                          </h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <!-- <p class="mb-0 text-s font-weight-bold">가격:</p> -->
                          <h6 class="mb-0 text-sm">
                            입장권 가격 : {{ teme.value }}
                          </h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <!-- <p class="mb-0 text-s font-weight-bold">:</p> -->
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

<style lang="scss" scoped></style>
