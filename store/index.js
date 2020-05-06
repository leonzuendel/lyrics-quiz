// Set Api Key for Musixmatch
// const params = {
// apikey: "f8d7dbbc38172c838c0fb110143084fa"
// };

export const state = () => ({
  projects: [],
  services: [
    {
      id: "1",
      title: "Vue.js",
      icon: "lab la-vuejs"
    },
    {
      id: "2",
      title: "Wordpress",
      icon: "lab la-wordpress-simple"
    },
    {
      id: "3",
      title: "HTML 5",
      icon: "lab la-html5"
    },
    {
      id: "4",
      title: "CSS 3",
      icon: "lab la-css3-alt"
    },
    {
      id: "5",
      title: "PHP",
      icon: "lab la-php"
    }
  ],
  posts: [],
  loading: true
});

// export const actions = {
// async getProjects({ commit }) {
// state.loading = true;
// const request = await await this.$axios.$get("http://icanhazip.com", {
// params
// });
// commit("SET_PROJECTS", request.data);
// }
// };

// export const mutations = {
// SET_PROJECTS(state, payload) {
// state.projects = payload;
// state.loading = false;
// }
// };
