import Cookie from 'js-cookie';

export const state = () => ({
  token: '',
  msg: '',
  type: '',
  user: [],
})

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_MSG(state, payload) {
    state.msg = payload;
  },
  SET_TYPE(state, payload) {
    state.type = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  }
}

export const actions = {
// User Login
  async handleUserLogin({commit}, data) {
    await this.$axios.post('/loginbyemail', {
      email: data.email,
      password: data.password
    })
    .then(res => {
      if(res.data.token) {
        commit('SET_TOKEN', res.data.token);
        commit('SET_TYPE', 'success');
        Cookie.set('token', res.data.token);
      } else if(res.data.error){
        commit('SET_MSG', res.data.error.message);
      } else {
        commit('SET_MSG', res.data.message);
      }
    })
  },
// Partner Login
  async handleLogin({commit}, data) {
    await this.$axios.post('/partnerlogin', {
      email: data.email,
      password: data.password
    })
    .then(res => {
      if(res.data.token) {
        commit('SET_TOKEN', res.data.token);
        commit('SET_TYPE', 'success');
        Cookie.set('token', res.data.token);
      } else if(res.data.error){
        commit('SET_MSG', res.data.error.message);
      } else {
        commit('SET_MSG', res.data.message);
      }
    })
  },
// Add Branch
  async handleAddBranch({commit}, data) {
    const config = {
      headers: {
        "Authorization": "Bearer " + Cookie.get('token'),
      }
    };
    await this.$axios.post('/add-branches', {
      merchant_id: data.merchant_id,
      branches_name: data.branches_name,
      address: data.address,
      reward_rates: data.reward_rates,
      asset_code: data.asset_code,
      minimum_spend: data.minimum_spend,
      approval_code: data.approval_code,
      logo_uri: data.logo_uri
    }, config)
    .then(res => {
      if(res.data) {
        commit('SET_MSG', res.data.message);
        commit('SET_TYPE', 'success');
      }
    })
  },
// Update
  async handleUpdate({commit}, data) {
    await this.$axios.setToken(Cookie.get('token'), 'Bearer')
    await this.$axios.post('/update-branches', {
      branches_name: data.branches_name,
      address: data.address,
      reward_rates: data.reward_rates,
      asset_code: data.asset_code,
      minimum_spend: data.minimum_spend,
      approval_code: data.approval_code,
      logo_uri: data.logo_uri,
      is_active: data.is_active,
    })
    .then(res => {
      if(res.data) {
        commit('SET_MSG', res.data.message);
      }
    })
  },
// Grant Access
  async handleActionGrant({commit}, data) {
    const config = {
      headers: {
        "Authorization": "Bearer " + Cookie.get('token'),
      }
    };
    await this.$axios.post('/branches-granted', {
      email: data.email,
      branches_name: data.branches_name
    }, config)
    .then(res => {
      if(res.data) {
        commit('SET_MSG', res.data.message);
      }
    })
  },
 // Change Password
  async handleChangePassword({commit}, data) {
    await this.$axios.setToken(Cookie.get('token'), 'Bearer')
    await this.$axios.post('/change-password', {
      current_password: data.current_password,
      new_password: data.new_password
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('SET_MSG', res.data.message);
        await commit('SET_TYPE', 'success');
      } else {
        await commit('SET_MSG', res.data.error.message);
        await commit('SET_TYPE', 'error');
      }
    })
  },
// Add Merchant 
  async handleAddMerchant({commit}, data) {
    await this.$axios.setToken(Cookie.get('token'), 'Bearer')
    await this.$axios.post('/add-merchant', {
      merchant_name: data.merchant_name,
      short_name: data.short_name
    })
    .then(async(res) => {
      if(res.data.message) {
        await commit('SET_MSG', res.data.message);
        await commit('SET_TYPE', 'success');
      } else {
        await commit('SET_MSG', res.data.error.message);
        await commit('SET_TYPE', 'error');
      }
    })
  },
// LogOut
  async handleLogOut({commit}) {
    await commit('SET_TOKEN', '');
    Cookie.remove('token');
  }
}