<template>
  <div>
    <h2>The View</h2>
    Lyrics: {{ lyrics }}
    <button @click="getLyrics()">Get Lyrics</button>
  </div>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      lyrics: ""
    };
  },
  methods: {
    async getLyrics() {
      this.$axios.setToken(
        "1_8V5eBJhdCFpIs-zbkZJiS3rtfUY4iId_RsLSD99MnIsjcKbOktlfVv_QMM_Mj6",
        "Bearer"
      );
      const data = await this.$axios.$get(
        "https://api.genius.com/songs/378195"
      );
      this.lyrics = data;
    }
  }
};
</script>

<style></style>
