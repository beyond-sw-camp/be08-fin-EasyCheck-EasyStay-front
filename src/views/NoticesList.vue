<template>
  <div class="py-4 container-fluid">
    <NoticesTable title="공지사항 목록" :authors="notices" />
  </div>
</template>

<script>
import NoticesTable from "./components/NoticesTable.vue";

import { mapState } from "vuex";

export default {
  components: { NoticesTable },
  computed: {
    ...mapState("notice", ["notices"]), // Vuex 상태에서 notices 가져오기
  },
  mounted() {
    // 공지사항을 가져오는 Vuex 액션 호출
    this.$store.dispatch("notice/getAllNotices");
  },
  data() {
    return {};
  },
};
</script>
