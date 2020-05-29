<template>
  <v-row>
    <v-col class="d-flex  align-center justify-center">
      <v-card class="pa-12" min-width="500px">
        <span class="font-weight-medium text-center display-1">
          Login To <img src="~/assets/zee-business.png" class="img">
        </span>
        <div class="py-4"></div>
        <v-form>
          <v-text-field
            label="Email"
            placeholder="Email"
            v-model="email"
            solo
          ></v-text-field>
          <v-text-field
            label="Password"
            placeholder="Password"
            type="password"
            v-model="password"
            solo
          ></v-text-field>
          <v-btn 
            large 
            :loading="loading" 
            style="width: 100%" 
            class="primary" 
            @click="Login()"
          >
            Login
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { message } from '~/utils/mixins/message.js';

export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'login',
  mixins: [ message ],
  data() {
    return {
      zee_business: require('~/assets/zee-business.png'),
      loading: false,

      email: '',
      password: ''
    }
  },
  methods: {
    Login() {
      this.loading = true;
      this.$store.dispatch('user/handleLogin', {
        email: this.email,
        password: this.password
      })
      .then(_=> {
        this.loading = false;
        if(this.type !== 'success') {
          this.$toast.error(this.msg)
        }
      })
      .catch(_=> {
        this.loading = false;
        this.$toast.error('Something Went Wrong On Our End!!');
      })
    }
  }
}
</script>

<style scoped>
  .v-row {
    min-height: 100vh!important;
  }
  .img {
    max-width: 260px;
    margin-bottom: -8px;
  }
</style>