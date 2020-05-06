<template>
  <div id="container">
    <div id="nav">
      <div class="links">
        <a href="https://github.com/leonzuendel/lyrics-quiz"
          ><i class="lab la-github"></i
        ></a>
      </div>
      <div>
        <h1>Lyrics Quiz</h1>
      </div>
      <div class="status-bar">
        <div class="status-icon" :class="{ online: online }"></div>
        <span class="status">{{ status }} </span
        ><span class="status-details">{{ statusDetails }}</span>
      </div>
    </div>
    <div id="view">
      <nuxt />
    </div>
    <div v-if="iosOverlay && iOS" id="ios-note">
      <p>
        <i class="las la-download"></i> Speicher diese App auf dem Homescreen
        für vollen <b>Device-Support</b>.
      </p>
      <p>Gehe dazu auf das <b>Teilen</b> Symbol > <b>Zum Home-Bildschirm</b></p>
      <div class="close" @click="iosOverlay = false">
        <i class="las la-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      iosOverlay: true
    };
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
    },
    iOS() {
      const iOS =
        !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      return iOS;
    }
  },

  mounted() {
    this.$store.dispatch("getStatus");
  },
  methods: {}
};
</script>

<style></style>
