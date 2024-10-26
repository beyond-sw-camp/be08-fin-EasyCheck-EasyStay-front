<template>
  <div>
    <EventTable :title="'이벤트 목록'" :events="events" />
  </div>
</template>

<script>
import EventTable from "./components/EventTable.vue"; // 이벤트 테이블 컴포넌트 경로 확인
import { mapState, mapActions } from "vuex";

export default {
  components: {
    EventTable,
  },
  computed: {
    ...mapState({
      events: (state) => state.event.Events, // Vuex 상태에서 dinings 가져오기
    }),
  },
  created() {
    this.getAllEvent(); // 컴포넌트 생성 시 다이닝 목록을 가져오는 액션 실행
  },
  methods: {
    ...mapActions("event", ["getAllEvent"]), // Vuex 액션 연결
  },
  // 컴포넌트가 마운트될 때 데이터 확인
  mounted() {
    // 공지사항을 가져오는 Vuex 액션 호출
    this.$store.dispatch("event/getAllEvent");
  },
};
</script>
