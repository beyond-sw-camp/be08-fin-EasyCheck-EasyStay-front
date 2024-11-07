import apiClient from "@/api";

export default {
  // namespaced가 true인 경우 namespaced로 작성해야 합니다 (오타 수정)
  namespaced: true, // 'namespace: true'가 아님

  state: {
    managerAccommodation: null,
    operationStats: null,
    graphStats: null,
    rooms: [],
    themeParks: [],
  },

  mutations: {
    // actions에서 직접 state를 수정하는 것은 Vuex 패턴에 맞지 않습니다
    // mutations를 추가해야 합니다
    SET_MANAGER_ACCOMMODATION(state, data) {
      state.managerAccommodation = data;
    },
    SET_OPERATION_STATS(state, data) {
      state.operationStats = data;
    },
    SET_GRAPH_STATS(state, data) {
      state.graphStats = data;
    },
    SET_ROOMS(state, data) {
      state.rooms = data;
    },
    SET_THEME_PARKS(state, data) {
      state.themeParks = data;
    },
  },

  actions: {
    // actions의 첫 번째 파라미터는 context 객체여야 합니다
    async fetchManagerAccommodation({ commit }) {
      // state가 아닌 { commit }
      try {
        const response = await apiClient.get("/admin/accommodation");
        commit("SET_MANAGER_ACCOMMODATION", response.data); // mutation을 통해 상태 변경
      } catch (err) {
        console.log(err);
        commit("SET_MANAGER_ACCOMMODATION", null);
      }
    },

    async fetchOperationStats({ commit }) {
      try {
        const response = await apiClient.get("/");
        commit("SET_OPERATION_STATS", response.data);
      } catch (err) {
        console.log(err);
        commit("SET_OPERATION_STATS", null);
      }
    },

    async fetchGraphStats({ commit }) {
      try {
        const response = await apiClient.get("/");
        commit("SET_GRAPH_STATS", response.data);
      } catch (err) {
        console.log(err);
        commit("SET_GRAPH_STATS", null);
      }
    },

    async fetchAllRooms({ commit }) {
      try {
        const response = await apiClient.get("/");
        commit("SET_ROOMS", response.data);
      } catch (err) {
        console.log(err);
        commit("SET_ROOMS", []); // graphStats가 아닌 rooms로 수정
      }
    },

    async fetchAllThemeParks({ commit }) {
      try {
        const response = await apiClient.get("/");
        commit("SET_THEME_PARKS", response.data);
      } catch (err) {
        console.log(err);
        commit("SET_THEME_PARKS", []);
      }
    },
  },

  getters: {
    manageAccommodationName: (state) => state.managerAccommodation?.name,
  },
};
