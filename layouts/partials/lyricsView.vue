<template>
  <div>
    <h2>The View</h2>
    Lyrics: {{ Lyrics }}
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
      const data = await this.$axios.$get(
        "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=196308462&apikey=f8d7dbbc38172c838c0fb110143084fa"
      );
      this.lyrics = data.message.body.lyrics.lyrics_body;
    }
  }
};
</script>

<style></style>
