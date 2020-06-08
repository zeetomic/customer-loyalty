<template>
  <v-row>
    <v-col class="d-flex flex-column align-center justify-center">
      <v-card class="pa-12" min-width="500px">
        <span class="font-weight-medium text-center display-1">
          SignUp To <img src="~/assets/zee-business.png" class="img">
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
            v-model="password"
            type="password"
            solo
          ></v-text-field>
          <v-btn 
            class="primary" 
            width="100%"
            :loading="loading"
            @click="handleLogin"
            large
          >
            Login with Zeetomic Account
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
      email: '',
      password: '',

      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store.dispatch('user/handleUserLogin', {
        email: this.email,
        password: this.password
      })
      .then(_=> {
        this.loading = false;
        if(this.type !== 'success') {
          this.$toast.error(this.msg)
        } else {
          this.$router.push('/addmerchant');
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
.img {
  max-width: 260px;
  margin-bottom: -8px;
}
</style>