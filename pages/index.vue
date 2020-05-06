<template>
  <div class="container">
    <div>{{ score }}</div>
    <button @click="getRandomSong()">Get Random Song</button>
    {{ randomSongId }}| {{ randomSong.track_name }}| {{ artist }}
    {{ artistId }}| Genre: {{ genre }}| Relatet:
    <template v-for="relatetArtist in relatedArtists">
      <span :key="relatetArtist.artist.artist_name">
        {{ relatetArtist.artist.artist_name }},
      </span>
    </template>
    <br />
    Shuffled: {{ shuffledArtists }}
    <LyricsView :lyrics="lyrics" />
    <AnswersView :answers="shuffledArtists" :correct-answer="artist" />
  </div>
</template>

<script>
import LyricsView from "@/layouts/partials/lyricsView.vue";
import AnswersView from "@/layouts/partials/answersView.vue";
export default {
  components: {
    LyricsView,
    AnswersView
  },
  data() {
    return {
      params: {
        apikey: "f8d7dbbc38172c838c0fb110143084fa"
      },
      chartSongs: [],
      randomSong: "",
      randomSongId: "",
      genre: "",
      artist: "",
      artistId: "",
      relatedArtists: "",
      lyrics: "",
      shuffledArtists: "",
      score: 0,
      randomArtists: []
    };
  },
  computed: {},
  methods: {
    async getRandomArtists() {
      const data = await this.$axios.$get(
        "/musixmatch/chart.artists.get?page=1&page_size=100&country=de",
        { params: this.params }
      );

      const array = data.message.body.artist_list;

      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.randomArtists.push(array[0]);
      this.randomArtists.push(array[99]);
    },
    async getCharts() {
      // await this.$axios.setToken(
      // "1_8V5eBJhdCFpIs-zbkZJiS3rtfUY4iId_RsLSD99MnIsjcKbOktlfVv_QMM_Mj6",
      // "Bearer"
      // );

      const data = await this.$axios.$get(
        "/musixmatch/chart.tracks.get?chart_name=top&page=1&page_size=100&country=de&f_has_lyrics=1",
        { params: this.params }
      );
      this.chartSongs = data.message.body.track_list;
    },

    async getLyrics(songId) {
      // await this.$axios.setToken(
      // "1_8V5eBJhdCFpIs-zbkZJiS3rtfUY4iId_RsLSD99MnIsjcKbOktlfVv_QMM_Mj6",
      // "Bearer"
      // );

      const data = await this.$axios.$get(
        "/musixmatch/track.lyrics.get?track_id=" + songId,
        { params: this.params }
      );
      this.lyrics = data.message.body.lyrics.lyrics_body;
    },

    async getRelatetArtists() {
      const data = await this.$axios.$get(
        "/musixmatch/artist.related.get?artist_id=" +
          this.artistId +
          "&page_size=2&page=1",
        { params: this.params }
      );
      this.relatedArtists = data.message.body.artist_list;
    },
    async shuffleArtists() {
      const array = [];
      this.shuffledArtists = array;
      array.push(this.artist);
      if (this.relatedArtists.length > 1) {
        array.push(this.relatedArtists[0].artist.artist_name);
        array.push(this.relatedArtists[1].artist.artist_name);
      } else {
        await this.getRandomArtists();
        array.push(this.randomArtists[0].artist.artist_name);
        array.push(this.randomArtists[1].artist.artist_name);
      }
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.shuffledArtists = array;
    },

    async getRandomSong() {
      await this.getCharts();
      const randomNumber = Math.floor(Math.random() * 100);
      if (
        this.chartSongs[randomNumber].track.primary_genres.music_genre_list
          .length > 0
      ) {
        this.randomSong = this.chartSongs[randomNumber].track;
        this.randomSongId = this.chartSongs[randomNumber].track.track_id;
        this.artist = this.randomSong.artist_name;
        this.artistId = this.randomSong.artist_id;
        this.genre = this.randomSong.primary_genres.music_genre_list[0].music_genre.music_genre_id;
        await this.getRelatetArtists();
        await this.getLyrics(this.randomSongId);
        await this.shuffleArtists();
      } else {
        await this.getRandomSong();
      }

      // Without Genre
      // this.randomSong = this.chartSongs[randomNumber].track;
      // this.randomSongId = this.chartSongs[randomNumber].track.track_id;
      // this.artist = this.randomSong.artist_name;
      // this.artistId = this.randomSong.artist_id;
      // this.genre = this.randomSong.primary_genres.music_genre_list[0].music_genre.music_genre_id;
      // await this.getRelatetArtists();
      // await this.getLyrics(this.randomSongId);
      // await this.shuffleArtists();
    }
  }
};
</script>

<style></style>
