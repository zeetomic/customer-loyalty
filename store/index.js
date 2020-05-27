import RSVP from 'rsvp';

export const actions = {
  async nuxtServerInit({ commit }, { req, redirect }) {
    if (!req.headers.cookie) return;
  // Get token from header
    const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("token="));
    if (!jwtCookie) return;
    const token = jwtCookie.split("=")[1];
    if(!token) return;
    await RSVP.all([
      this.$axios.setToken(token, 'Bearer'),
      this.$axios.get('/userprofile')
      .then(res => {
        commit('user/SET_USER', res.data);
        commit('user/SET_TOKEN', token);
      })
      .catch(_=> {
        redirect('/login');
        commit('user/SET_TOKEN', '');
      }),
    ])
  }
}