<template>
  <div id="container">
    <div v-show="gameIsOver != true">
      <StartMenu :game-is-ready="gameIsReady" :loading="loading" />
      <InfoView
        v-if="gameIsReady"
        :score="score"
        :current-song-count="currentSongCount"
        :lenght="randomSongs.length"
      />
      <Loader :loading="loading" />
      <div v-if="gameIsReady">
        <LyricsView :lyrics="lyrics" />
        <AnswersView
          :answers="shuffledArtists"
          :correct-answer="artist"
          :title="randomSong.track_name"
        />
      </div>
    </div>
    <GameOver :game-is-over="gameIsOver" :score="score" />
  </div>
</template>

<script>
import StartMenu from "@/layouts/partials/startMenu.vue";
import Loader from "@/layouts/partials/loader.vue";
import InfoView from "@/layouts/partials/infoView.vue";
import LyricsView from "@/layouts/partials/lyricsView.vue";
import AnswersView from "@/layouts/partials/answersView.vue";
import GameOver from "@/layouts/partials/gameOver.vue";
export default {
  components: {
    StartMenu,
    Loader,
    InfoView,
    LyricsView,
    AnswersView,
    GameOver
  },
  data() {
    return {
      params: {
        apikey: "f8d7dbbc38172c838c0fb110143084fa"
      },
      loading: false,
      chartSongs: [],
      randomSong: "",
      randomSongId: "",
      genre: "",
      artist: "",
      artistId: "",
      relatedArtists: "",
      lyrics: "",
      shuffledArtists: [],
      score: 0,
      randomArtists: [],
      randomSongs: [],
      currentSongCount: 0,
      gameIsReady: false,
      gameIsOver: false
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
        if (
          this.randomArtists[0].artist.artist_name !== this.artist &&
          this.randomArtists[1].artist.artist_name !== this.artist
        ) {
          array.push(this.randomArtists[0].artist.artist_name);
          array.push(this.randomArtists[1].artist.artist_name);
        } else {
          this.shuffleArtists();
        }
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
    },

    async getRandomSongs(amount) {
      this.score = 0;
      this.currentSongCount = 0;
      this.gameIsOver = false;
      this.loading = true;
      this.randomSongs = [];
      await this.getCharts();

      const arr = [];
      while (arr.length < amount) {
        const r = Math.floor(Math.random() * 100);
        if (!arr.includes(r)) arr.push(r);
      }

      arr.forEach((num) => {
        this.randomSongs.push(this.chartSongs[num]);
      });
      this.randomSong = this.randomSongs[this.currentSongCount].track;
      this.randomSongId = this.randomSongs[
        this.currentSongCount
      ].track.track_id;
      this.artist = this.randomSong.artist_name;
      this.artistId = this.randomSong.artist_id;
      await this.getRelatetArtists();
      await this.getLyrics(this.randomSongId);
      await this.shuffleArtists();
      this.loading = false;
      this.gameIsReady = true;
    },

    async nextSong() {
      this.loading = true;
      if (this.currentSongCount < this.randomSongs.length - 1) {
        this.currentSongCount++;
        this.randomSong = this.randomSongs[this.currentSongCount].track;
        this.randomSongId = this.randomSongs[
          this.currentSongCount
        ].track.track_id;
        this.artist = this.randomSong.artist_name;
        this.artistId = this.randomSong.artist_id;
        await this.getRelatetArtists();
        await this.getLyrics(this.randomSongId);
        await this.shuffleArtists();
        this.loading = false;
      } else {
        this.loading = false;
        this.endGame();
      }
    },

    endGame() {
      this.gameIsOver = true;
    }
  }
};
</script>

<style></style>
