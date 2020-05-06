// Set Api Key for Musixmatch
// const params = {
// apikey: "f8d7dbbc38172c838c0fb110143084fa"
// };

export const state = () => ({
  status: "",
  loading: true,
  params: {
    apikey: "202852dc9d84671e6d3a51446f9159fc"
  }
});

export const actions = {
  async getStatus({ commit }) {
    const data = await this.$axios.$get(
      "/musixmatch/chart.artists.get?page=1&page_size=1&country=de",
      { params: this.params }
    );
    commit("SET_STATUS", data.message.header.status_code);
  }
};

export const mutations = {
  SET_STATUS(state, payload) {
    state.status = payload;
    state.loading = false;
  }
};
