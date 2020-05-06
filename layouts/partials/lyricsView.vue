<template>
  <div>
    <h2>lyricsView</h2>
    Lyrics:
    <div class="pre-formatted">{{ lyrics }}</div>
  </div>
</template>

<script>
export default {
  props: {
    lyrics: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
