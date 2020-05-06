<template>
  <div id="lyrics-view">
    <div class="lyrics">
      <p v-for="verse in cutLyrics" :key="verse">{{ verse }}</p>
    </div>
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
      const stringArray = this.lyrics.split("\n");
      const newArray = stringArray.slice(0, 13);
      return newArray;
    }
  },
  methods: {}
};
</script>

<style></style>
