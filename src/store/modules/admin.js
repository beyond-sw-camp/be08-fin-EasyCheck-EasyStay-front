import apiClient from "@/api";

export default {
  state: {
    // 가장 인기있는 객실, 당일 목표 대비 실적, 문의 개수, 매출 정보 저장할 state
    operationStats: null,
    // 각 객실별 매출 현황, 각 테마파크별 매출 현황 저장할 state
    graphStats: null,
    // 모든 객실
    rooms: [],
    // 모든 테마파크
    themeParks: [],
  },
  mutations: {},
  actions: {
    // 대시보드 상단에 있는
    // 가장 인기있는 객실, 당일 목표 대비 실적, 문의 개수, 매출 정보 조회
    async fetchOperationStats(state) {
      try {
        // api 결정되면 주소 적으면 됨
        const response = await apiClient.get("/");
        state.operationStats = response.data;
      } catch (err) {
        console.log(err);
        // 실패할 경우 state null로 초기화
        state.operationStats = null;
      }
    },
    // 각 객실별 매출 현황, 각 테마파크별 매출 현황 조회
    async fetchGraphStats(state) {
      try {
        const response = await apiClient.get("/");
        state.graphStats = response.data;
      } catch (err) {
        console.log(err);
        // 실패할 경우 state null로 초기화
        state.graphStats = null;
      }
    },
    // 모든 객실 불러오기
    async fetchAllRooms(state) {
      try {
        const response = await apiClient.get("/");
        state.rooms = response.data;
      } catch (err) {
        console.log(err);
        // 실패할 경우 state 빈 배열로 초기화
        state.graphStats = [];
      }
    },
    // 모든 테마파크 불러오기
    async fetchAllThemeParks(state) {
      try {
        const response = await apiClient.get("/");
        state.themeParks = response.data;
      } catch (err) {
        console.log(err);
        // 실패할 경우 state 빈 배열로 초기화
        state.themeParks = [];
      }
    },
  },
  getters: {},
};
