<!-- 최종 관리자 대시보드 -->

<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import SuperAdminChart from "@/examples/Charts/SuperAdminChart.vue";
import SuperAdminChart2 from "@/examples/Charts/SuperAdminChart2.vue";
import Theme from "@/assets/img/icons/flags/teme.png";
import Hotel1 from "@/assets/img/icons/flags/Hotel1.png";
import Hotel2 from "@/assets/img/icons/flags/Hotel2.png";
import Hotel3 from "@/assets/img/icons/flags/Hotel3.png";
import Hotel4 from "@/assets/img/icons/flags/Hotel4.png";
import Hotel5 from "@/assets/img/icons/flags/Hotel5.png";
import Hotel6 from "@/assets/img/icons/flags/Hotel6.png";
import Hotel7 from "@/assets/img/icons/flags/Hotel7.png";
import Hotel8 from "@/assets/img/icons/flags/Hotel8.png";
import Hotel9 from "@/assets/img/icons/flags/Hotel9.png";
import Hotel10 from "@/assets/img/icons/flags/Hotel10.png";

import { onMounted } from "vue";

onMounted(() => {});

// 객실 관리
const sales = {
  us: {
    country: "A리조트",
    sales: 10,
    value: "$288,000",
    bounce: "2명",
    flag: Hotel1,
  },
  germany: {
    country: "B리조트",
    sales: 10,
    value: "$360,000",
    bounce: "4명",
    flag: Hotel2,
  },
  britain: {
    country: "C리조트",
    sales: 10,
    value: "$460,000",
    bounce: "6명",
    flag: Hotel3,
  },
  brasil: {
    country: "D리조트",
    sales: 10,
    value: "$1,208,000",
    bounce: "2명",
    flag: Hotel4,
  },
  canada: {
    country: "E리조트",
    sales: 12,
    value: "$320,000",
    bounce: "3명",
    flag: Hotel5,
  },
  australia: {
    country: "A호텔",
    sales: 11,
    value: "$410,000",
    bounce: "5명",
    flag: Hotel6,
  },
  france: {
    country: "B호텔",
    sales: 9,
    value: "$540,000",
    bounce: "4명",
    flag: Hotel7,
  },
  italy: {
    country: "C호텔",
    sales: 8,
    value: "$1,350,000",
    bounce: "3명",
    flag: Hotel8,
  },
  spain: {
    country: "D호텔",
    sales: 15,
    value: "$450,000",
    bounce: "2명",
    flag: Hotel9,
  },
  japan: {
    country: "E호텔",
    sales: 14,
    value: "$520,000",
    bounce: "3명",
    flag: Hotel10,
  },
};
// 객실 관리
const temes = {
  resort1: {
    country: "설악 워터피아",
    sales: 10,
    value: "$288,000",
    bounce: "2명",
    flag: Theme,
  },
  resort2: {
    country: "플라자CC 설악",
    sales: 10,
    value: "$360,000",
    bounce: "4명",
    flag: Theme,
  },
  resort3: {
    country: "워터파크",
    sales: 10,
    value: "$460,000",
    bounce: "6명",
    flag: Theme,
  },
  resort4: {
    country: "한화리조트 양평",
    sales: 8,
    value: "$220,000",
    bounce: "3명",
    flag: Theme,
  },
  resort5: {
    country: "한화리조트 대천",
    sales: 12,
    value: "$390,000",
    bounce: "5명",
    flag: Theme,
  },
  resort6: {
    country: "한화리조트 제주",
    sales: 15,
    value: "$500,000",
    bounce: "7명",
    flag: Theme,
  },
  resort7: {
    country: "한화리조트 백암",
    sales: 7,
    value: "$210,000",
    bounce: "2명",
    flag: Theme,
  },
  resort8: {
    country: "한화리조트 지리산",
    sales: 9,
    value: "$280,000",
    bounce: "4명",
    flag: Theme,
  },
  resort9: {
    country: "한화리조트 수안보",
    sales: 11,
    value: "$330,000",
    bounce: "6명",
    flag: Theme,
  },
  resort10: {
    country: "한화리조트 산정호수",
    sales: 13,
    value: "$470,000",
    bounce: "5명",
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
              description="설악 리조트"
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
            <div class="card z-index-2">
              <!-- 각 숙박시설별 매출 현황 월 단위로 -->
              <super-admin-chart
                id="chart-line-1"
                title="각 숙박시설 월별 매출 현황"
                description=""
                :chart="{
                  labels: ['Jul', 'Aug', 'Sep'],
                  datasets: [
                    {
                      label: 'A리조트',
                      data: [180, 200, 320, 400, 280],
                    },
                    {
                      label: 'B리조트',
                      data: [150, 220, 340, 380, 270],
                    },
                    {
                      label: 'C리조트',
                      data: [140, 210, 330, 370, 260],
                    },
                    {
                      label: 'D리조트',
                      data: [120, 180, 290, 340, 230],
                    },
                    {
                      label: 'E리조트',
                      data: [100, 160, 250, 300, 210],
                    },
                    {
                      label: 'A호텔',
                      data: [220, 280, 400, 450, 320],
                    },
                    {
                      label: 'B호텔',
                      data: [170, 230, 370, 420, 310],
                    },
                    {
                      label: 'C호텔',
                      data: [300, 350, 500, 550, 400],
                    },
                    {
                      label: 'D호텔',
                      data: [250, 300, 480, 530, 390],
                    },
                    {
                      label: 'E호텔',
                      data: [400, 450, 600, 650, 500],
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
              <super-admin-chart2
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
                    {
                      label: '한화리조트 양평',
                      data: [130, 125, 140],
                    },
                    {
                      label: '한화리조트 대천',
                      data: [115, 135, 125],
                    },
                    {
                      label: '한화리조트 제주',
                      data: [140, 150, 160],
                    },
                    {
                      label: '한화리조트 백암',
                      data: [105, 130, 120],
                    },
                    {
                      label: '한화리조트 지리산',
                      data: [125, 115, 135],
                    },
                    {
                      label: '한화리조트 수안보',
                      data: [110, 145, 120],
                    },
                    {
                      label: '한화리조트 산정호수',
                      data: [130, 140, 150],
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
              <div
                class="table-responsive"
                style="max-height: 300px; overflow-y: auto"
              >
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
              <div
                class="table-responsive"
                style="max-height: 300px; overflow-y: auto"
              >
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
