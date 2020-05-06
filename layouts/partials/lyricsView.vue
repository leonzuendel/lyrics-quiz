<template>
  <div id="lyrics-view">
    <div class="pre-formatted">{{ cutLyrics }}</div>
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
  computed: {
    cutLyrics() {
      const lines = this.lyrics.split("\n");
      // remove one line, starting at the first position
      lines.slice(0, 9);
      // join the array back into a single string
      const newtext = lines.join("\n");
      return newtext;
    }
  },
  methods: {}
};
</script>

<style></style>
