<!-- 최종 관리자 대시보드 -->

<script setup>
import { ref } from "vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import SuperAdminChart from "@/examples/Charts/SuperAdminChart.vue";
import SuperAdminChart2 from "@/examples/Charts/SuperAdminChart2.vue";
import Theme from "@/assets/img/icons/flags/teme.png";
import Hotel1 from "@/assets/img/icons/flags/Hotel1.png";
import Hotel2 from "@/assets/img/icons/flags/Hotel2.png";
import Hotel3 from "@/assets/img/icons/flags/Hotel3.png";
import Hotel4 from "@/assets/img/icons/flags/Hotel4.png";
import Hotel5 from "@/assets/img/icons/flags/Hotel5.png";
// import Hotel6 from "@/assets/img/icons/flags/Hotel6.png";
// import Hotel7 from "@/assets/img/icons/flags/Hotel7.png";
// import Hotel8 from "@/assets/img/icons/flags/Hotel8.png";
// import Hotel9 from "@/assets/img/icons/flags/Hotel9.png";
// import Hotel10 from "@/assets/img/icons/flags/Hotel10.png";

const sales = ref({
  us: {
    country: "한화 설악 쏘라노",
    sales: 10,
    value: "85,000만원",
    bounce: "2명",
    flag: Hotel1,
  },
  germany: {
    country: "한화 거제 벨버디어",
    sales: 10,
    value: "78,000만원",
    bounce: "4명",
    flag: Hotel2,
  },
  britain: {
    country: "한화 산정호수 안시",
    sales: 10,
    value: "52,000만원",
    bounce: "6명",
    flag: Hotel3,
  },
  brasil: {
    country: "스플라스 리솜",
    sales: 10,
    value: "48,000만원",
    bounce: "2명",
    flag: Hotel4,
  },
  canada: {
    country: "인스파이어 리조트",
    sales: 12,
    value: "62,000만원",
    bounce: "3명",
    flag: Hotel5,
  },
  // australia: {
  //   country: "시그니엘호텔",
  //   sales: 11,
  //   value: "92,000만원",
  //   bounce: "5명",
  //   flag: Hotel6,
  // },
  // france: {
  //   country: "더 플라자호텔",
  //   sales: 9,
  //   value: "85,000만원",
  //   bounce: "4명",
  //   flag: Hotel7,
  // },
  // italy: {
  //   country: "MATIÈ Osiria",
  //   sales: 8,
  //   value: "82,000만원",
  //   bounce: "3명",
  //   flag: Hotel8,
  // },
  // spain: {
  //   country: "여수 벨메르",
  //   sales: 15,
  //   value: "78,000만원",
  //   bounce: "2명",
  //   flag: Hotel9,
  // },
  // japan: {
  //   country: "브리드 양양",
  //   sales: 14,
  //   value: "72,000만원",
  //   bounce: "3명",
  //   flag: Hotel10,
  // },
});

const temes = ref({
  resort1: {
    country: "설악 워터피아",
    sales: 10,
    value: "48,000만원",
    bounce: "2명",
    flag: Theme,
  },
  resort2: {
    country: "플라자CC 설악",
    sales: 10,
    value: "22,000만원",
    bounce: "4명",
    flag: Theme,
  },
  resort3: {
    country: "인피니티풀",
    sales: 10,
    value: "35,000만원",
    bounce: "6명",
    flag: Theme,
  },
  resort4: {
    country: "마리나",
    sales: 8,
    value: "52,000만원",
    bounce: "3명",
    flag: Theme,
  },
  resort5: {
    country: "산정 에코 물놀이장",
    sales: 12,
    value: "38,000만원",
    bounce: "5명",
    flag: Theme,
  },
  resort6: {
    country: "온천 사우나",
    sales: 15,
    value: "28,000만원",
    bounce: "7명",
    flag: Theme,
  },
  resort7: {
    country: "스플라스 워터파크",
    sales: 7,
    value: "42,000만원",
    bounce: "2명",
    flag: Theme,
  },
  resort8: {
    country: "라라골프클럽",
    sales: 9,
    value: "32,000만원",
    bounce: "4명",
    flag: Theme,
  },
  resort9: {
    country: "디즈니랜드",
    sales: 11,
    value: "45,000만원",
    bounce: "6명",
    flag: Theme,
  },
  resort10: {
    country: "온천 사우나",
    sales: 13,
    value: "98,000만원",
    bounce: "5명",
    flag: Theme,
  },
});
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <!-- 모든 숙박시설 중 가장 인기있는 지점-->
            <mini-statistics-card
              title="가장 인기있는 지점"
              value="시그니엘호텔"
              description="월 평균 매출 85,000만원"
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
              value="429,000만원"
              description="<span class='text-sm font-weight-bolder text-success'>+5.2%</span> 전년 대비 상승"
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
              value="440,000만원"
              description="<span class='text-sm font-weight-bolder text-success'>+3.8%</span> 전년 대비 상승"
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
              value="869,000만원"
              description="<span class='text-sm font-weight-bolder text-success'>+4.5%</span> 전년 대비 상승"
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
                            <h6 class="mb-0 text-m">
                              종류 : {{ sale.country }}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">개수 : {{ sale.sales }}</h6>
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
                            <h6 class="mb-0 text-m">
                              종류 : {{ teme.country }}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">
                            시설 개수 : {{ teme.sales }}
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

<style lang="scss" scoped></style>
