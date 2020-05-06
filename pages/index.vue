<template>
  <div class="container">
    <LyricsView :params="params" />
  </div>
</template>

<script>
import LyricsView from "@/layouts/partials/lyricsView.vue";
export default {
  components: {
    LyricsView
  },
  data() {
    return {
      params: {
        apikey: "f8d7dbbc38172c838c0fb110143084fa"
      }
    };
  }
};
</script>

<style></style>
