<template>
  <div id="lyrics-view">
    <div class="pre-formatted lyrics">{{ cutLyrics }}</div>
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
      const newSplitText = lines.slice(0, 13);
      // join the array back into a single string
      const newtext = newSplitText.join("\n");
      return newtext;
    }
  },
  methods: {}
};
</script>

<style></style>
