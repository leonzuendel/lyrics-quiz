<template>
  <div id="container">
    <div id="nav">
      <div class="links">
        <a href="https://github.com/leonzuendel/lyrics-quiz"
          ><i class="lab la-github"></i
        ></a>
      </div>
      <div><h1>Lyrics Quiz</h1></div>
      <div class="status-bar">
        <div class="status-icon" :class="{ online: online }"></div>
        <span class="status">{{ status }} </span
        ><span class="status-details">{{ statusDetails }}</span>
      </div>
    </div>
    <div id="view">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["status"]),
    online() {
      if (this.status === 401) {
        return true;
      } else {
        return false;
      }
    },
    statusDetails() {
      if (this.status === 401) {
        return "API Online";
      } else {
        return "API Offline";
      }
    }
  },

  mounted() {
    this.$store.dispatch("getStatus");
  },
  methods: {}
};
</script>

<style></style>
